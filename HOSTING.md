# Hosting ESTHIEN LABS on Cloudflare

This project is a static Vite website. The production build is generated into `dist/`, so it is a good fit for Cloudflare Pages.

## Local Commands

```bash
npm install
npm run build
npm run preview
```

## Cloudflare Workers & Pages Setup

1. Push this folder to a GitHub repository.
2. In Cloudflare, open **Workers & Pages** and create a new project.
3. Connect the GitHub repository.
4. Use these build settings:
   - Framework preset: `Vite`
   - Build command: `npm run build`
   - Deploy command: `npx wrangler deploy`
   - Root directory: `/`
5. Deploy the project.

This repository includes `wrangler.jsonc`, which tells Cloudflare to deploy the `dist/` folder as static assets and use proper SPA routing for routes such as `/about`, `/vision`, `/capabilities`, and `/contact`.

## Cloudflare Pages Without GitHub

If you want to launch before setting up GitHub:

1. Run `npm run build`.
2. Open **Workers & Pages** in Cloudflare.
3. Create a Pages project with **Direct Upload**.
4. Upload the generated `dist/` folder.
5. Add `esthien.com` as the custom domain after the upload deploys.

## Custom Domain: esthien.com

Because `esthien.com` was bought through Cloudflare, DNS is already in the right place.

1. Open the deployed Cloudflare Pages project.
2. Go to **Custom domains**.
3. Add `esthien.com`.
4. Add `www.esthien.com` as a second custom domain if you want the `www` version to work too.
5. Cloudflare will create the required DNS records automatically for Pages-hosted domains.
6. Keep **Always Use HTTPS** enabled in SSL/TLS settings.
7. If both root and `www` are active, choose one canonical URL and redirect the other to it.

## Email and Socials

- Configure `contact@esthien.com` before launch with Google Workspace, Cloudflare Email Routing, or another provider.
- If using Google Workspace, add the MX, SPF, DKIM, and DMARC records Cloudflare asks for.
- Security alert emails go to `founder@esthien.com` through the Cloudflare Worker endpoint at `/api/security-breach`.
- For automatic security emails, configure either `SECURITY_WEBHOOK_URL` or `RESEND_API_KEY` in Cloudflare Worker secrets. If using Resend, also set `SECURITY_FROM_EMAIL` to a verified sender such as `Esthien Security <security@esthien.com>`.
- Add official social links in `src/data/site.ts` under `site.socialLinks` when handles are created.
- The current website links the official LinkedIn and Instagram profiles and reserves room for X and YouTube without exposing fake links.

## Recommended Launch Checks

- Confirm `https://esthien.com` opens the site.
- Confirm `https://www.esthien.com` either opens the site or redirects to the root domain.
- Confirm `contact@esthien.com` is configured with your email provider before launch.
- Update `src/data/site.ts` when official social profiles exist.
- Run `npm run build` before every deployment.
- Test Home, About, Vision, Capabilities, and Contact after every deployment.
- Do not add a `_redirects` file. This project uses `wrangler.jsonc` with `assets.not_found_handling = "single-page-application"` for Cloudflare SPA routing.

## Future Development

The site is already split into routes and reusable sections:

- Add social links in `src/data/site.ts`.
- Add new navigation pages in `src/data/site.ts` and `src/App.tsx`.
- Add deeper capability pages when there are verified details to publish.
- Keep `/public/esthien-og.svg` as the editable source and regenerate `/public/esthien-og.png` whenever the social artwork changes.
