import { createEnquiryHandler } from "@/lib/enquiry-handler";

export const runtime = "nodejs";

export const POST = createEnquiryHandler({
  config: () => ({
    apiKey: process.env.RESEND_API_KEY,
    from: process.env.ENQUIRY_FROM_EMAIL,
    to: process.env.ENQUIRY_TO_EMAIL,
    siteUrl: process.env.NEXT_PUBLIC_SITE_URL,
  }),
});
