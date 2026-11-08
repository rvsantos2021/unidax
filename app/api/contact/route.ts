import { NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";

export const runtime = "nodejs";

const MAX_BODY_BYTES = 16 * 1024;
const RATE_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT = 8;
const attempts = new Map<string, { count: number; resetAt: number }>();

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
    source: data.utm_source || "direct", medium: data.utm_medium || "none",
    campaign: data.utm_campaign || "", content: data.utm_content || "",
    term: data.utm_term || "", gclid: data.gclid || "", fbclid: data.fbclid || "",
    landingPage: data.landingPage || "", referrer: data.referrer || "",
  };
}

function isRateLimited(ip: string) {
  const now = Date.now();
  for (const [key, entry] of attempts) if (entry.resetAt <= now) attempts.delete(key);
  const current = attempts.get(ip);
  if (!current || current.resetAt <= now) {
    attempts.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return false;
  }
  current.count += 1;
  return current.count > RATE_LIMIT;
}

export async function POST(request: Request) {
  const contentLength = Number(request.headers.get("content-length") || 0);
  if (contentLength > MAX_BODY_BYTES) {
    return NextResponse.json({ error: "A solicitação excede o tamanho permitido." }, { status: 413 });
  }

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim()
    || request.headers.get("x-real-ip") || "unknown";
  if (isRateLimited(ip)) {
    return NextResponse.json({ error: "Muitas solicitações. Aguarde alguns minutos e tente novamente." }, {
      status: 429, headers: { "Retry-After": String(Math.ceil(RATE_WINDOW_MS / 1000)) },
    });
  }

  try {
    const reader = request.body?.getReader();
    if (!reader) return NextResponse.json({ error: "Corpo da solicitação ausente." }, { status: 400 });
    const chunks: Uint8Array[] = [];
    let totalBytes = 0;
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      totalBytes += value.byteLength;
      if (totalBytes > MAX_BODY_BYTES) {
        await reader.cancel();
        return NextResponse.json({ error: "A solicitação excede o tamanho permitido." }, { status: 413 });
      }
      chunks.push(value);
    }
    const bytes = new Uint8Array(totalBytes);
    let offset = 0;
    for (const chunk of chunks) { bytes.set(chunk, offset); offset += chunk.byteLength; }
    const rawBody = new TextDecoder().decode(bytes);
    let body: unknown;
    try { body = JSON.parse(rawBody); }
    catch { return NextResponse.json({ error: "O corpo da solicitação não contém JSON válido." }, { status: 400 }); }

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
        `Telefone: ${phone || "Não informado"}`, `Interesse principal: ${interest || "Não informado"}`,
        "", "Atribuição:", `Origem: ${tracking.source}`, `Mídia: ${tracking.medium}`,
        `Campanha: ${tracking.campaign || "—"}`, `Conteúdo: ${tracking.content || "—"}`,
        `Termo: ${tracking.term || "—"}`, `Landing page: ${tracking.landingPage || "—"}`,
        `Referer: ${tracking.referrer || "—"}`, "", message,
      ].join("\n"),
    });
    if (result.error) return NextResponse.json({ error: "Não foi possível enviar a mensagem agora." }, { status: 502 });

    const webhook = process.env.CRM_WEBHOOK_URL;
    if (webhook) {
      try {
        const response = await fetch(webhook, {
          method: "POST", headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            event: "website_lead", timestamp: new Date().toISOString(),
            lead: { name, company, email, phone: phone || "", interest: interest || "", message },
            attribution: tracking,
          }),
          cache: "no-store", signal: AbortSignal.timeout(5000),
        });
        if (!response.ok) console.error("CRM webhook returned HTTP", response.status);
      } catch (error) {
        console.error("CRM webhook delivery failed", error);
      }
    }
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Não foi possível processar a solicitação." }, { status: 500 });
  }
}
