import { NextResponse } from "next/server";
import { Resend } from "resend";
import {
  getFichaTecnicaNotificationTemplate,
  getFichaTecnicaUserTemplate,
} from "@/lib/email-templates";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, productoNombre, fichaTecnicaUrl, fichaTecnicaNombre } = body;

    // Validate required fields
    if (!email || !productoNombre || !fichaTecnicaUrl || !fichaTecnicaNombre) {
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

    const templateData = {
      email,
      productoNombre,
      fichaTecnicaUrl,
      fichaTecnicaNombre,
    };

    // Send notification to admin
    await resend.emails.send({
      from: "EggPertise <noreply@eggpertise.com>",
      to: [process.env.CONTACT_EMAIL || "info@eggpertise.com"],
      subject: `Nueva solicitud de ficha técnica: ${productoNombre}`,
      html: getFichaTecnicaNotificationTemplate(templateData),
    });

    // Send ficha técnica to user
    await resend.emails.send({
      from: "EggPertise <noreply@eggpertise.com>",
      to: [email],
      subject: `Ficha Técnica - ${productoNombre}`,
      html: getFichaTecnicaUserTemplate(templateData),
    });

    return NextResponse.json(
      {
        success: true,
        message: "Ficha técnica enviada exitosamente",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error sending ficha técnica:", error);
    return NextResponse.json(
      {
        error: "Error al enviar la ficha técnica. Por favor intente nuevamente.",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
