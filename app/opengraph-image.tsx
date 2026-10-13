import { ImageResponse } from "next/og";
export const runtime="edge";
export const alt="UNIDAX — IA aplicada à transformação e eficiência empresarial";
export const size={width:1200,height:630};
export const contentType="image/png";
export default function Image(){return new ImageResponse(<div style={{width:"100%",height:"100%",display:"flex",flexDirection:"column",justifyContent:"center",padding:"72px",background:"#09131b",color:"white",fontFamily:"Arial"}}><div style={{fontSize:28,color:"#f13b59",fontWeight:700,letterSpacing:3}}>UNIDAX</div><div style={{fontSize:68,fontWeight:800,lineHeight:1.04,marginTop:30,maxWidth:1000}}>IA aplicada à transformação e eficiência empresarial.</div><div style={{fontSize:27,color:"#b9c3ca",marginTop:28}}>Estratégia · Dados · Sistemas · Inteligência artificial</div><div style={{position:"absolute",right:70,bottom:55,width:150,height:6,background:"#dc2747"}}/></div>)}
