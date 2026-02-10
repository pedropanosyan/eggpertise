import { NextResponse } from "next/server";
import { Resend } from "resend";
import { getContactFormEmailTemplate } from "@/lib/email-templates";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { nombre, email, empresa, mensaje } = body;

    // Validate required fields
    if (!nombre || !email || !empresa || !mensaje) {
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
      html: getContactFormEmailTemplate({ nombre, email, empresa, mensaje }),
    });

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
