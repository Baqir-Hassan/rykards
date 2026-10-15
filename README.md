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

## Enquiry form delivery

The form posts to `/api/enquiry`. Messages are sent through Resend to
`contact@rykards.com` by default. The visitor's email is set as Reply-To; the sender
and recipient are controlled only by server environment variables.

1. Verify a sending domain in [Resend](https://resend.com/docs/dashboard/domains/introduction).
2. Configure `RESEND_API_KEY` and `ENQUIRY_FROM_EMAIL` in the intended Vercel
   environment. The sender must use the verified domain. Do not put secrets in
   `NEXT_PUBLIC_` variables or commit them. For local use, copy `.env.example` to
   `.env.local` and fill the values privately.
3. Optionally set `ENQUIRY_TO_EMAIL` to override the destination. Preview
   environments should use a team-controlled test inbox.
4. After deployment, submit a clearly labelled test enquiry, confirm it arrives
   in the intended inbox, and check that Reply addresses the visitor. A successful
   API response means Resend accepted the email; it does not prove inbox delivery.

Without the required configuration, the form is disabled with a direct email
fallback, and the endpoint returns 503. Provider errors and network timeouts keep
the visitor's entered details and offer a retry or email. Retries of an unchanged
message use the same Resend idempotency key to reduce duplicate emails.

The endpoint checks origin, validates fields and selected products, limits request
size, and uses a honeypot. Its five-attempts-per-ten-minutes limiter is bounded and
local to each running server instance. It is not a durable, shared limit across
Vercel instances. Configure platform rate limiting if public traffic warrants it.

Run the isolated delivery-contract and validation checks with:

```bash
node --test tests/enquiry.test.cjs
```

These checks use a mocked email provider and send no external messages. Live
inbox delivery requires the separately configured service and inbox check above.
