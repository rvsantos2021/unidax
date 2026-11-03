import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;
const base: IconProps = { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.7, strokeLinecap: "round", strokeLinejoin: "round" };

export function ArrowIcon(props: IconProps) { return <svg {...base} {...props}><path d="M5 12h13"/><path d="m13 6 6 6-6 6"/></svg>; }
export function MenuIcon(props: IconProps) { return <svg {...base} {...props}><path d="M4 7h16M4 12h16M4 17h16"/></svg>; }
export function XIcon(props: IconProps) { return <svg {...base} {...props}><path d="m6 6 12 12M18 6 6 18"/></svg>; }
export function SparkIcon(props: IconProps) { return <svg {...base} {...props}><path d="m12 3 1.5 5.5L19 10l-5.5 1.5L12 17l-1.5-5.5L5 10l5.5-1.5L12 3Z"/><path d="m19 16 .6 2.4L22 19l-2.4.6L19 22l-.6-2.4L16 19l2.4-.6L19 16Z"/></svg>; }
export function DatabaseIcon(props: IconProps) { return <svg {...base} {...props}><ellipse cx="12" cy="5" rx="7" ry="3"/><path d="M5 5v7c0 1.7 3.1 3 7 3s7-1.3 7-3V5"/><path d="M5 12v7c0 1.7 3.1 3 7 3s7-1.3 7-3v-7"/></svg>; }
export function FlowIcon(props: IconProps) { return <svg {...base} {...props}><circle cx="6" cy="6" r="2.5"/><circle cx="18" cy="6" r="2.5"/><circle cx="12" cy="18" r="2.5"/><path d="M8.5 6h7M7.6 8l2.8 7.5M16.4 8l-2.8 7.5"/></svg>; }
export function BotIcon(props: IconProps) { return <svg {...base} {...props}><rect x="5" y="7" width="14" height="12" rx="3"/><path d="M12 3v4M8.5 12h.01M15.5 12h.01M8.5 16h7"/><path d="M3 12h2M19 12h2"/></svg>; }
export function LayersIcon(props: IconProps) { return <svg {...base} {...props}><path d="m12 3 8 4-8 4-8-4 8-4Z"/><path d="m4 12 8 4 8-4M4 17l8 4 8-4"/></svg>; }
export function ShieldIcon(props: IconProps) { return <svg {...base} {...props}><path d="M12 3 20 6v5c0 5-3.4 8.4-8 10-4.6-1.6-8-5-8-10V6l8-3Z"/></svg>; }

export function MailIcon(props: IconProps) { return <svg {...base} {...props}><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m4 7 8 6 8-6"/></svg>; }
export function PhoneIcon(props: IconProps) { return <svg {...base} {...props}><path d="M7 3h3l1.5 4-2 1.5a14 14 0 0 0 6 6l1.5-2 4 1.5v3c0 1.1-.9 2-2 2C10.9 19 5 13.1 5 6c0-1.7.9-3 2-3Z"/></svg>; }

export function TargetIcon(props: IconProps) { return <svg {...base} {...props}><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="4"/><line x1="12" y1="3" x2="12" y2="5"/><line x1="12" y1="19" x2="12" y2="21"/><line x1="3" y1="12" x2="5" y2="12"/><line x1="19" y1="12" x2="21" y2="12"/></svg>; }
export function UsersIcon(props: IconProps) { return <svg {...base} {...props}><circle cx="9" cy="7" r="3"/><path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6"/><circle cx="17" cy="8" r="2.5"/><path d="M21 20c0-2.8-1.8-5.1-4.3-5.9"/></svg>; }
export function GaugeIcon(props: IconProps) { return <svg {...base} {...props}><path d="M12 20a8 8 0 1 0-5.66-13.66"/><path d="M12 20a8 8 0 0 0 5.66-13.66"/><line x1="12" y1="12" x2="8.5" y2="8.5"/><circle cx="12" cy="12" r="1.5" fill="currentColor" stroke="none"/></svg>; }
export function LockIcon(props: IconProps) { return <svg {...base} {...props}><rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/><circle cx="12" cy="16" r="1.5" fill="currentColor" stroke="none"/></svg>; }
