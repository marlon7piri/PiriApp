import { Resend } from "resend";
import EmailTemplate from "./EmailTemplate";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
  const pedido = await req.json();

 try {
    const { data, error } = await resend.emails.send({
        from: "Acme <onboarding@resend.dev>",
        to: ["marlon7piri@gmail.com"],
        subject: "Pedido de Esta Semana",
        react: EmailTemplate({ pedido }),
      });
    
      if (error) {
        return NextResponse.json("Error al enviar el email", { status: 500 });
      }
    
      return NextResponse.json(data);
 } catch (error) {
    return NextResponse.json(error);
 }
}
