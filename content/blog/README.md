# How to add a localized blog post

New approved posts live in locale folders:

- `content/blog/vi/`
- `content/blog/en/`
- `content/blog/it/`
- `content/blog/id/`
- `content/blog/es/`

Use the same file name (canonical slug) in all five folders so the language switcher keeps the reader on the translated version of the same article.

1. Copy `_template.md` into each locale folder.
2. Rename the copies with the same URL-friendly name, for example:
   `2026-06-10-vietnam-to-taiwan-rate-update.md`.
3. Edit the fields at the top:

```md
---
title: "Your blog post title"
date: "2026-06-10"
category: "Daily Update"
excerpt: "One short sentence that appears on the blog card."
readTime: "3 min read"
image: "/blog/2026-06-10-vietnam-to-taiwan-rate-update.png"
imageAlt: "Localized description of the editorial image"
source1: "Official source title|https://official.example/document"
source2: "Second verified source|https://example.com/article"
---
```

4. Write the article content below the second `---`.
5. Leave one blank line between paragraphs.

Example:

```md
Today we received more inquiries for Vietnam to Kaohsiung shipments.

For customers shipping general cargo, please prepare cargo type, total CBM, gross weight, and ready date before requesting a quote.
```

The file name becomes the shared blog slug. The surrounding locale selects the correct translated file.

Example:
`2026-06-10-vietnam-to-taiwan-rate-update.md`

Examples:

- `/vi/blog/2026-06-10-vietnam-to-taiwan-rate-update`
- `/en/blog/2026-06-10-vietnam-to-taiwan-rate-update`
- `/it/blog/2026-06-10-vietnam-to-taiwan-rate-update`

Drafts must remain in `content/drafts/YYYY-MM-DD/` until the owner explicitly approves them. Draft files are never read by the public blog.
