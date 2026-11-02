import { NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";

const schema = z.object({
  name: z.string().trim().min(2).max(120),
  company: z.string().trim().min(2).max(160),
  email: z.string().trim().email().max(200),
  phone: z.string().trim().max(50).optional().or(z.literal("")),
  interest: z.string().trim().max(160).optional(),
  message: z.string().trim().min(10).max(5000),
  consent: z.literal("yes"),
  website: z.string().optional(),
  utm_source: z.string().trim().max(200).optional(),
  utm_medium: z.string().trim().max(200).optional(),
  utm_campaign: z.string().trim().max(200).optional(),
  utm_content: z.string().trim().max(200).optional(),
  utm_term: z.string().trim().max(200).optional(),
  gclid: z.string().trim().max(300).optional(),
  fbclid: z.string().trim().max(300).optional(),
  landingPage: z.string().url().max(1000).optional(),
  referrer: z.string().max(1000).optional(),
});

function attribution(data: z.infer<typeof schema>) {
  return {
    source: data.utm_source || "direct",
    medium: data.utm_medium || "none",
    campaign: data.utm_campaign || "",
    content: data.utm_content || "",
    term: data.utm_term || "",
    gclid: data.gclid || "",
    fbclid: data.fbclid || "",
    landingPage: data.landingPage || "",
    referrer: data.referrer || "",
  };
}

export async function POST(request: Request) {
  try {
    const body: unknown = await request.json();
    const parsed = schema.safeParse(body);
    if (!parsed.success) return NextResponse.json({ error: "Revise os campos do formulário." }, { status: 400 });
    if (parsed.data.website) return NextResponse.json({ ok: true });

    const { name, company, email, phone, interest, message } = parsed.data;
    const tracking = attribution(parsed.data);
    const apiKey = process.env.RESEND_API_KEY;
    const to = process.env.CONTACT_TO || "contato@unidax.com.br";
    const from = process.env.CONTACT_FROM || "UNIDAX Site <site@unidax.com.br>";
    if (!apiKey) return NextResponse.json({ error: "O canal de contato ainda não está configurado no ambiente de produção." }, { status: 503 });

    const resend = new Resend(apiKey);
    const result = await resend.emails.send({
      from, to, replyTo: email,
      subject: `Novo lead pelo site — ${company}`,
      text: [
        `Nome: ${name}`, `Empresa: ${company}`, `E-mail: ${email}`,
        `Telefone: ${phone || "Não informado"}`,
        `Interesse principal: ${interest || "Não informado"}`,
        "", "Atribuição:", `Origem: ${tracking.source}`, `Mídia: ${tracking.medium}`,
        `Campanha: ${tracking.campaign || "—"}`, `Conteúdo: ${tracking.content || "—"}`,
        `Termo: ${tracking.term || "—"}`, `Landing page: ${tracking.landingPage || "—"}`,
        `Referer: ${tracking.referrer || "—"}`, "", message,
      ].join("\\n"),
    });
    if (result.error) return NextResponse.json({ error: "Não foi possível enviar a mensagem agora." }, { status: 502 });

    const webhook = process.env.CRM_WEBHOOK_URL;
    if (webhook) {
      try {
        await fetch(webhook, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            event: "website_lead",
            timestamp: new Date().toISOString(),
            lead: { name, company, email, phone: phone || "", interest: interest || "", message },
            attribution: tracking,
          }),
          cache: "no-store",
        });
      } catch {
        // O e-mail já foi entregue; o encaminhamento ao CRM é secundário.
      }
    }
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Não foi possível processar a solicitação." }, { status: 500 });
  }
}
