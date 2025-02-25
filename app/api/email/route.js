import { Resend } from "resend";
import EmailTemplate from "./EmailTemplate";
import { NextResponse } from "next/server";
import nodemailer from 'nodemailer'

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
  const pedido = await req.json();

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'marlon7piri@gmail.com',
        pass: 'gxpz xido xpkl bciv'
      }
    })

    const listaProductos = pedido
      .map((producto) => `- ${producto.nombre}: ${producto.cantidad}`)
      .join("\n");


    const mailOptions = {
      from: 'marlon7piri@gmail.com',
      to: ['marlonrodriguezrivera777@gmail.com'],
      subject: 'Nuevo pedido',
      text: `Hola,\n\nAquí está el pedido:\n\n${listaProductos}\n\nSaludos,\nTu Empresa`,
    }

    const info = await transporter.sendMail(mailOptions);

    return NextResponse.json({ message: "Correo enviado con éxito", info });
    /*  const { data, error } = await resend.emails.send({
       from: "Acme <onboarding@resend.dev>",
       to: ["marlon7piri@gmail.com"],
       subject: "Pedido de Esta Semana",
       react: EmailTemplate({ pedido }),
     }); */

  } catch (error) {
    return NextResponse.json(error);
  }
}
