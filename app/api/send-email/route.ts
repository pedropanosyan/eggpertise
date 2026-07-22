import { NextResponse } from "next/server";
import { Resend } from "resend";
import { getContactFormEmailTemplate } from "@/lib/email-templates";

const resend = new Resend(process.env.RESEND_API_KEY);
const LEADS_SHEET_ENDPOINT = process.env.LEADS_SHEET_ENDPOINT;
const LEADS_SHEET_TOKEN = process.env.LEADS_SHEET_TOKEN;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { nombre, email, empresa, pais, mensaje } = body;

    // Validate required fields
    if (!nombre || !email || !empresa || !pais || !mensaje) {
      return NextResponse.json(
        { error: "Todos los campos son requeridos" },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "El email no es válido" },
        { status: 400 }
      );
    }

    // Send email using Resend
    const data = await resend.emails.send({
      from: "EggPertise Contact Form <noreply@eggpertise.com>",
      to: [process.env.CONTACT_EMAIL || "info@eggpertise.com"],
      replyTo: email,
      subject: `Nueva consulta de ${nombre} - ${empresa}`,
      html: getContactFormEmailTemplate({ nombre, email, empresa, pais, mensaje }),
    });

    // Mirroring the lead to the spreadsheet is a secondary channel: a failure
    // here must never fail the request, since the email was already delivered.
    if (LEADS_SHEET_ENDPOINT) {
      try {
        const sheetResponse = await fetch(LEADS_SHEET_ENDPOINT, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          // Keys must match the spreadsheet header row exactly. The ID and
          // date columns are derived by the script, not sent from here.
          body: JSON.stringify({
            token: LEADS_SHEET_TOKEN,
            Nombre: nombre,
            Email: email,
            Empresa: empresa,
            País: pais,
            Mensaje: mensaje,
            Estado: "Nuevo",
            Fuente: "Formulario Web",
            Notas: "Generado automáticamente desde eggpertise.com",
          }),
        });

        // fetch only rejects on network errors, so a non-2xx has to be
        // checked explicitly or the failure passes silently.
        if (!sheetResponse.ok) {
          const details = await sheetResponse.text().catch(() => "");
          throw new Error(`HTTP ${sheetResponse.status} ${details}`);
        }

        // Apps Script Web Apps always answer 200, so the real outcome lives
        // in the payload rather than the status code.
        const result = await sheetResponse.json();
        if (result?.ok !== true) {
          throw new Error(result?.error ?? "Unexpected response payload");
        }
      } catch (sheetError) {
        console.error(
          `Spreadsheet sync failed for ${email}:`,
          sheetError instanceof Error ? sheetError.message : sheetError
        );
      }
    }

    return NextResponse.json(
      {
        success: true,
        message: "Email enviado exitosamente",
        data,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      {
        error: "Error al enviar el email. Por favor intente nuevamente.",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
