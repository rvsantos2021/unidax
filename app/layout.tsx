import type { Metadata, Viewport } from "next";
import { Manrope, Space_Grotesk } from "next/font/google";
import { SiteHeader } from "@/components/site-header";
import { Footer } from "@/components/footer";
import { AnalyticsBanner, AnalyticsConsent } from "@/components/analytics";
import { site } from "@/lib/content";
import { JsonLd } from "@/components/seo/json-ld";
import "./globals.css";
const manrope=Manrope({subsets:["latin"],variable:"--font-manrope",display:"swap"});
const space=Space_Grotesk({subsets:["latin"],variable:"--font-space",display:"swap"});
export const viewport: Viewport={width:"device-width",initialScale:1,themeColor:"#09131b"};
export const metadata: Metadata={metadataBase:new URL(site.url),title:{default:"UNIDAX — IA aplicada à transformação e eficiência empresarial",template:"%s | UNIDAX"},description:site.description,applicationName:"UNIDAX",creator:"UNIDAX",publisher:"UNIDAX",alternates:{canonical:"/"},robots:{index:true,follow:true},openGraph:{type:"website",locale:"pt_BR",siteName:site.name,title:site.tagline,description:site.description,url:site.url,images:[{url:"/opengraph-image",width:1200,height:630,alt:site.tagline}]},twitter:{card:"summary_large_image",title:site.tagline,description:site.description,images:["/opengraph-image"]},icons:{icon:"/assets/img/favicon.svg"}};
const jsonLd={"@context":"https://schema.org","@type":"Organization",name:site.name,url:site.url,logo:`${site.url}/assets/img/UNIDAX.png`,description:site.description};
export default function RootLayout({children}:{readonly children:React.ReactNode}){return <html lang="pt-BR"><body className={`${manrope.variable} ${space.variable}`}><JsonLd data={jsonLd} /><SiteHeader/>{children}<Footer/><AnalyticsConsent/><AnalyticsBanner/></body></html>}
