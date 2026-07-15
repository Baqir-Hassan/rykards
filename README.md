# Rykards website

The public website for Rykards, built with Next.js, React, TypeScript, and Tailwind CSS.

## Local development

Requirements: Node.js 20.9 or newer.

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Production check

```bash
npm run build
npm run start
```

## Deploy on Vercel

1. Push this repository to GitHub, GitLab, or Bitbucket.
2. Import the repository in Vercel.
3. Keep the detected framework as **Next.js** and the root directory as the repository root.
4. No custom build command or output directory is required.
5. Optionally set `NEXT_PUBLIC_SITE_URL` to the production domain, such as `https://rykards.com`. Without it, the deployment uses Vercel's project URL automatically.

Vercel will run `npm run build` and create preview deployments for new branches and pull requests.