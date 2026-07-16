import type { ReactNode } from "react";
import type { BlogBlock } from "@/lib/blog";

function renderInline(text: string): ReactNode[] {
  const parts = text.split(/(\[[^\]]+\]\(https?:\/\/[^)]+\))/g);
  return parts.map((part, index) => {
    const match = part.match(/^\[([^\]]+)\]\((https?:\/\/[^)]+)\)$/);
    if (!match) return part;
    return (
      <a
        key={`${match[2]}-${index}`}
        href={match[2]}
        target="_blank"
        rel="noopener noreferrer"
        className="font-bold text-ocean-blue underline underline-offset-4"
      >
        {match[1]}
      </a>
    );
  });
}

export default function BlogArticleContent({ blocks }: { blocks: BlogBlock[] }) {
  return (
    <div className="rounded-lg border border-border-subtle bg-white p-6 shadow-sm sm:p-10">
      {blocks.map((block, index) => {
        if (block.type === "heading") {
          return (
            <h2 key={`${block.text}-${index}`} className="mb-4 mt-9 text-2xl font-black text-[#0B1F3A] first:mt-0">
              {renderInline(block.text)}
            </h2>
          );
        }
        if (block.type === "list") {
          return (
            <ul key={`list-${index}`} className="mb-6 list-disc space-y-3 pl-6 leading-8 text-text-secondary">
              {block.items.map((item) => <li key={item}>{renderInline(item)}</li>)}
            </ul>
          );
        }
        return (
          <p key={`${block.text}-${index}`} className="mb-6 text-base leading-8 text-text-secondary last:mb-0">
            {renderInline(block.text)}
          </p>
        );
      })}
    </div>
  );
}

