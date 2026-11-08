import type { Insight, PortableTextBlock } from "@/lib/content";

function renderChildren(block: PortableTextBlock) {
  return (block.children || []).map((child, index) => {
    let node: React.ReactNode = child.text || "";
    for (const mark of child.marks || []) {
      if (mark === "strong") node = <strong key={`${child._key || index}-strong`}>{node}</strong>;
      else if (mark === "em") node = <em key={`${child._key || index}-em`}>{node}</em>;
      else if (mark === "underline") node = <u key={`${child._key || index}-u`}>{node}</u>;
      else if (mark === "code") node = <code key={`${child._key || index}-code`}>{node}</code>;
      else {
        const link = block.markDefs?.find((definition) => definition._key === mark && definition._type === "link");
        if (link?.href && /^https?:\/\//i.test(link.href)) node = <a key={`${child._key || index}-link`} href={link.href} target="_blank" rel="noopener noreferrer">{node}</a>;
      }
    }
    return <span key={child._key || index}>{node}</span>;
  });
}

export function InsightContent({ content }: { content: Insight["content"] }) {
  if (content.length === 0) return null;
  if (typeof content[0] === "string") {
    return <>{(content as string[]).map((paragraph, index) => <p key={`${index}-${paragraph}`}>{paragraph}</p>)}</>;
  }

  return <>{(content as PortableTextBlock[]).map((block, index) => {
    const key = block._key || index;
    const children = renderChildren(block);
    if (block._type !== "block") return null;
    if (block.listItem === "bullet") return <ul key={key}><li>{children}</li></ul>;
    if (block.listItem === "number") return <ol key={key}><li>{children}</li></ol>;
    switch (block.style) {
      case "h2": return <h2 key={key}>{children}</h2>;
      case "h3": return <h3 key={key}>{children}</h3>;
      case "h4": return <h4 key={key}>{children}</h4>;
      case "blockquote": return <blockquote key={key}>{children}</blockquote>;
      default: return <p key={key}>{children}</p>;
    }
  })}</>;
}
