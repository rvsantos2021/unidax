"use client";
import Script from "next/script";
import { useEffect, useState } from "react";

const KEY = "unidax-analytics-consent";
export function AnalyticsConsent() {
  const [consent, setConsent] = useState<string | null>(null);
  useEffect(() => setConsent(window.localStorage.getItem(KEY)), []);
  if (!process.env.NEXT_PUBLIC_GA_ID || consent !== "accepted") return null;
  return <>
    <Script src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`} strategy="afterInteractive" />
    <Script id="ga4" strategy="afterInteractive">{`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${process.env.NEXT_PUBLIC_GA_ID}',{anonymize_ip:true});`}</Script>
  </>;
}

export function AnalyticsBanner() {
  const [visible, setVisible] = useState(false);
  useEffect(() => setVisible(!window.localStorage.getItem(KEY)), []);
  if (!visible) return null;
  const save = (value: "accepted" | "rejected") => { window.localStorage.setItem(KEY, value); setVisible(false); };
  return <aside className="cookie-banner" role="dialog" aria-label="Preferências de privacidade">
    <div><strong>Privacidade e métricas</strong><p>Usamos cookies opcionais de analytics para entender o uso do site e melhorar a experiência. Você pode recusar.</p><a href="/privacidade">Saiba mais</a></div>
    <div className="cookie-actions"><button className="btn btn-ghost" onClick={() => save("rejected")}>Recusar</button><button className="btn btn-primary" onClick={() => save("accepted")}>Aceitar métricas</button></div>
  </aside>;
}
