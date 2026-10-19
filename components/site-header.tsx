"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowIcon, MenuIcon, XIcon } from "./icons";
const links = [["IA & Transformação", "/ia"], ["Serviços", "/servicos"], ["Cases", "/cases"], ["Insights", "/insights"], ["A UNIDAX", "/empresa"]];
export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false); const [open, setOpen] = useState(false); const navRef = useRef<HTMLElement>(null);
  useEffect(() => { const onScroll=()=>setScrolled(window.scrollY>30); onScroll(); window.addEventListener("scroll",onScroll,{passive:true}); return()=>window.removeEventListener("scroll",onScroll); },[]);
  useEffect(() => { document.body.classList.toggle("menu-open",open); if(open) navRef.current?.querySelector<HTMLElement>("a")?.focus(); return()=>document.body.classList.remove("menu-open"); },[open]);
  useEffect(() => { const onKey=(e:KeyboardEvent)=>{if(e.key==="Escape")setOpen(false)}; window.addEventListener("keydown",onKey); return()=>window.removeEventListener("keydown",onKey); },[]);
  return <header className={`site-header ${scrolled?"is-scrolled":""}`}><div className="container nav">
    <Link href="/" className="brand" aria-label="UNIDAX — início"><Image src="/assets/img/UNIDAX-branco.png" alt="UNIDAX" width={160} height={48} priority className="logo logo-white"/><Image src="/assets/img/UNIDAX.png" alt="UNIDAX" width={160} height={49} priority className="logo logo-dark"/></Link>
    <nav ref={navRef} id="main-navigation" className={open?"nav-links open":"nav-links"} aria-label="Navegação principal">{links.map(([label,href])=><Link key={href} href={href} onClick={()=>setOpen(false)}>{label}</Link>)}<Link href="/contato" className="header-cta" onClick={()=>setOpen(false)}>Fale com um especialista <ArrowIcon/></Link></nav>
    <button type="button" className="menu-toggle" onClick={()=>setOpen(v=>!v)} aria-label={open?"Fechar menu":"Abrir menu"} aria-expanded={open} aria-controls="main-navigation">{open?<XIcon/>:<MenuIcon/>}</button>
  </div></header>;
}
