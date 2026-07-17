# Deploy UST NJ (ustnj.com) — step by step

Your site code is ready in this folder and committed to git.
Follow these steps in order.

---

## Part A — Push to GitHub (one time)

### 1. Log into GitHub CLI

Open **PowerShell** or **Terminal** and run:

```powershell
gh auth login
```

Choose:
- **GitHub.com**
- **HTTPS**
- **Login with a web browser**
- Copy the code → press Enter → paste/approve in the browser

### 2. Create the repo and push

From this folder (`C:\Users\Eagle\ust-nj`):

```powershell
cd C:\Users\Eagle\ust-nj
gh repo create ust-nj --public --source=. --remote=origin --push
```

That creates `https://github.com/YOURUSERNAME/ust-nj` and uploads the site.

*(If the repo name is taken, use `ustnj-website` instead of `ust-nj`.)*

---

## Part B — Free hosting on Cloudflare Pages (recommended)

You already own **ustnj.com**. Easiest path if the domain is (or will be) on Cloudflare:

### 1. Create a free Cloudflare account
https://dash.cloudflare.com/sign-up

### 2. Add your domain to Cloudflare (if not already)
- **Websites** → **Add a domain** → `ustnj.com`
- Choose **Free** plan
- Cloudflare shows 2 nameservers — go to wherever you bought the domain and set those nameservers
- Wait until status is **Active** (can take minutes to a few hours)

### 3. Create a Pages project from GitHub
1. Cloudflare dashboard → **Workers & Pages** → **Create** → **Pages** → **Connect to Git**
2. Authorize GitHub → pick the **ust-nj** repo
3. Settings:
   - **Framework preset:** None
   - **Build command:** *(leave empty)*
   - **Build output directory:** `/` (or leave as `.` / empty root)
4. **Save and Deploy**

You’ll get a temporary URL like `https://ust-nj.pages.dev` — open it to confirm the site works.

### 4. Attach ustnj.com
1. In the Pages project → **Custom domains** → **Set up a custom domain**
2. Enter `ustnj.com` and `www.ustnj.com`
3. Cloudflare adds the DNS records for you if the domain is on Cloudflare
4. Wait for SSL (usually a few minutes)

**Live site:** https://ustnj.com

---

## Part C — If domain is NOT on Cloudflare yet

Wherever you bought `ustnj.com` (GoDaddy, Namecheap, Google Domains/Squarespace, etc.):

### Option 1 — Move DNS to Cloudflare (best)
Add site in Cloudflare → change nameservers at the registrar to Cloudflare’s. Then Part B §4.

### Option 2 — Stay at registrar, use Netlify instead
1. https://app.netlify.com → sign up with GitHub
2. **Add new site** → **Import from Git** → pick `ust-nj`
3. Build: none · Publish directory: `.`
4. Deploy → **Domain settings** → **Add custom domain** → `ustnj.com`
5. Netlify shows DNS records (usually A/CNAME or nameservers)
6. At your registrar, add those records
7. Wait for SSL

---

## Part D — After the site is live (same day)

1. **Replace phone/email** on the site (search for `XXX` and `hello@ustnj.com` if needed), commit, push:

```powershell
cd C:\Users\Eagle\ust-nj
# edit files, then:
git add -A
git commit -m "Add real contact info"
git push
```

Cloudflare/Netlify redeploys automatically in ~1 minute.

2. **Google Search Console** → add `https://ustnj.com` → submit `https://ustnj.com/sitemap.xml`

3. **Google Business Profile** → service area business, New Jersey, link website to `https://ustnj.com`

4. **Start calling stations** with the live URL on hand

---

## Quick checks

| Check | URL |
|--------|-----|
| Homepage | https://ustnj.com/ |
| Contact | https://ustnj.com/contact.html |
| Sitemap | https://ustnj.com/sitemap.xml |
| Robots | https://ustnj.com/robots.txt |

---

## If something fails

| Problem | Fix |
|---------|-----|
| `gh auth login` fails | Install/update: https://cli.github.com — or create repo on github.com website and push manually |
| Pages shows blank / 404 | Build output must be site root (where `index.html` lives), not a subfolder |
| Domain not secure | Wait 5–30 min for SSL; ensure DNS is Active |
| `www` works but root doesn’t | Add both custom domains in Pages; enable redirect www → apex or reverse |

Need help with a specific step? Say where you bought the domain (Cloudflare, GoDaddy, etc.) and how far you got.
