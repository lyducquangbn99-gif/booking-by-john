import fs from "node:fs";
import path from "node:path";

export type BlogPost = {
  slug: string;
  title: string;
  date: string;
  category: string;
  excerpt: string;
  readTime: string;
  content: string[];
};

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

function readFrontmatter(markdown: string) {
  const match = markdown.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!match) {
    return { meta: {} as Record<string, string>, body: markdown };
  }

  const meta = match[1].split(/\r?\n/).reduce<Record<string, string>>((acc, line) => {
    const separatorIndex = line.indexOf(":");
    if (separatorIndex === -1) return acc;

    const key = line.slice(0, separatorIndex).trim();
    const value = line.slice(separatorIndex + 1).trim().replace(/^["']|["']$/g, "");
    acc[key] = value;
    return acc;
  }, {});

  return { meta, body: match[2].trim() };
}

function markdownToParagraphs(body: string) {
  return body
    .split(/\r?\n\r?\n/)
    .map((block) => block.replace(/\r?\n/g, " ").trim())
    .filter(Boolean);
}

function readPost(fileName: string): BlogPost {
  const filePath = path.join(BLOG_DIR, fileName);
  const markdown = fs.readFileSync(filePath, "utf8");
  const { meta, body } = readFrontmatter(markdown);
  const slug = fileName.replace(/\.md$/, "");

  return {
    slug,
    title: meta.title || slug,
    date: meta.date || "",
    category: meta.category || "Logistics Update",
    excerpt: meta.excerpt || "",
    readTime: meta.readTime || "3 min read",
    content: markdownToParagraphs(body),
  };
}

export function getAllBlogPosts() {
  if (!fs.existsSync(BLOG_DIR)) {
    return [];
  }

  return fs
    .readdirSync(BLOG_DIR)
    .filter((fileName) => fileName.endsWith(".md") && !fileName.startsWith("_"))
    .map(readPost)
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function getBlogPost(slug: string) {
  return getAllBlogPosts().find((post) => post.slug === slug);
}

export function getRecentBlogPosts(limit = 3) {
  return getAllBlogPosts().slice(0, limit);
}
