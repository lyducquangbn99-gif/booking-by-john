import fs from "node:fs";
import path from "node:path";

export const BLOG_LOCALES = ["vi", "en", "it", "id", "es"] as const;
export type BlogLocale = (typeof BLOG_LOCALES)[number];

export type BlogSource = {
  title: string;
  url: string;
};

export type BlogBlock =
  | { type: "heading"; text: string }
  | { type: "paragraph"; text: string }
  | { type: "list"; items: string[] };

export type BlogPost = {
  slug: string;
  locale: BlogLocale;
  title: string;
  date: string;
  category: string;
  excerpt: string;
  readTime: string;
  image: string;
  imageAlt: string;
  content: BlogBlock[];
  sources: BlogSource[];
};

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

function isPublishableMarkdown(fileName: string) {
  return (
    fileName.endsWith(".md") &&
    !fileName.startsWith("_") &&
    fileName.toLowerCase() !== "readme.md"
  );
}

function isBlogLocale(locale: string): locale is BlogLocale {
  return BLOG_LOCALES.includes(locale as BlogLocale);
}

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

function markdownToBlocks(body: string): BlogBlock[] {
  return body
    .split(/\r?\n\r?\n/)
    .map((block) => block.trim())
    .filter(Boolean)
    .map((block) => {
      if (block.startsWith("## ")) {
        return { type: "heading", text: block.slice(3).trim() };
      }

      const lines = block.split(/\r?\n/).map((line) => line.trim()).filter(Boolean);
      if (lines.length > 0 && lines.every((line) => line.startsWith("- "))) {
        return { type: "list", items: lines.map((line) => line.slice(2).trim()) };
      }

      return { type: "paragraph", text: lines.join(" ") };
    });
}

function frontmatterSources(meta: Record<string, string>) {
  return Object.keys(meta)
    .filter((key) => /^source\d+$/i.test(key))
    .sort((a, b) => Number(a.replace(/\D/g, "")) - Number(b.replace(/\D/g, "")))
    .map((key) => {
      const [title, url] = meta[key].split("|").map((value) => value.trim());
      return title && /^https?:\/\//.test(url || "") ? { title, url } : null;
    })
    .filter((source): source is BlogSource => Boolean(source));
}

function readPost(filePath: string, locale: BlogLocale): BlogPost {
  const fileName = path.basename(filePath);
  const markdown = fs.readFileSync(filePath, "utf8");
  const { meta, body } = readFrontmatter(markdown);
  const slug = fileName.replace(/\.md$/, "");

  return {
    slug,
    locale,
    title: meta.title || slug,
    date: meta.date || "",
    category: meta.category || "Logistics Update",
    excerpt: meta.excerpt || "",
    readTime: meta.readTime || "3 min read",
    image: meta.image || "/logistics-hero.png",
    imageAlt: meta.imageAlt || meta.title || slug,
    content: markdownToBlocks(body),
    sources: frontmatterSources(meta),
  };
}

function localizedFiles(locale: BlogLocale) {
  const localeDir = path.join(BLOG_DIR, locale);
  if (!fs.existsSync(localeDir)) return [];
  return fs
    .readdirSync(localeDir)
    .filter(isPublishableMarkdown)
    .map((fileName) => path.join(localeDir, fileName));
}

function legacyEnglishFiles() {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs
    .readdirSync(BLOG_DIR, { withFileTypes: true })
    .filter((entry) => entry.isFile() && isPublishableMarkdown(entry.name))
    .map((entry) => path.join(BLOG_DIR, entry.name));
}

export function getAllBlogPosts(localeInput = "en") {
  const locale = isBlogLocale(localeInput) ? localeInput : "en";
  const files = localizedFiles(locale);

  if (locale === "en") {
    const localizedSlugs = new Set(files.map((filePath) => path.basename(filePath)));
    for (const legacyFile of legacyEnglishFiles()) {
      if (!localizedSlugs.has(path.basename(legacyFile))) files.push(legacyFile);
    }
  }

  return files
    .map((filePath) => readPost(filePath, locale))
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function getBlogPost(locale: string, slug: string) {
  return getAllBlogPosts(locale).find((post) => post.slug === slug);
}

export function getRecentBlogPosts(locale: string, limit = 3) {
  return getAllBlogPosts(locale).slice(0, limit);
}
