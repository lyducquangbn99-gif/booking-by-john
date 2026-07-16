# Editorial approval queue

The weekday automation writes unapproved content here using this structure:

`content/drafts/YYYY-MM-DD/{vi,en,it,id,es,sources}.md`

It also creates a rights-safe editorial image under the same dated folder for review. Nothing in this directory is rendered by the public website.

Only after the owner explicitly writes **PHÊ DUYỆT** may an agent:

1. copy the five localized files into `content/blog/{locale}/` using one shared slug;
2. copy the approved image into `public/blog/`;
3. run lint and a production build;
4. deploy the verified build.

If approval is not explicit, leave the draft here and do not publish it.

