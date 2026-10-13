"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export function ContactForm() {
  const router = useRouter();
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [message, setMessage] = useState("");
  const [attribution, setAttribution] = useState<Record<string, string>>({});
  const [interest, setInterest] = useState("");

  useEffect(() => {
    const url = new URL(window.location.href);
    setInterest(url.searchParams.get("interesse") || "");
    const keys = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "gclid", "fbclid"];
    const values: Record<string, string> = {};
    for (const key of keys) { const value = url.searchParams.get(key); if (value) values[key] = value; }
    values.landingPage = window.location.href;
    values.referrer = document.referrer;
    setAttribution(values);
  }, []);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setStatus("loading"); setMessage("");
    const form = event.currentTarget;
    const data = { ...Object.fromEntries(new FormData(form).entries()), ...attribution };
    try {
      const response = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
      const json = await response.json();
      if (!response.ok) throw new Error(json.error || "Não foi possível enviar a mensagem.");
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({ event: "generate_lead", lead_source: "website_contact" });
      router.push("/obrigado");
    } catch (error) { setStatus("error"); setMessage(error instanceof Error ? error.message : "Não foi possível enviar a mensagem."); }
  }
  return <form className="contact-form" onSubmit={submit}>
    <input className="honeypot" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" />
    <div className="form-grid"><label>Nome<input required name="name" autoComplete="name" placeholder="Seu nome" /></label><label>Empresa<input required name="company" autoComplete="organization" placeholder="Sua empresa" /></label></div>
    <div className="form-grid"><label>E-mail<input required type="email" name="email" autoComplete="email" placeholder="voce@empresa.com.br" /></label><label>Telefone<input name="phone" autoComplete="tel" placeholder="(00) 00000-0000" /></label></div>
    <label>Interesse principal<input name="interest" value={interest} onChange={(event) => setInterest(event.target.value)} placeholder="Ex.: agentes de IA, dados, sistemas" /></label>
    <label>Como podemos ajudar?<textarea required name="message" rows={6} placeholder="Conte brevemente o desafio ou oportunidade que você quer discutir." /></label>
    <label className="consent"><input required type="checkbox" name="consent" value="yes" /> <span>Concordo em ser contatado pela UNIDAX sobre esta solicitação.</span></label>
    <button className="btn btn-primary" disabled={status === "loading"}>{status === "loading" ? "Enviando…" : "Enviar mensagem"}</button>
    <p className={`form-message ${status}`} role={status === "error" ? "alert" : undefined} aria-live="polite">{message}</p>
  </form>;
}

declare global { interface Window { dataLayer?: Array<Record<string, unknown>>; } }
