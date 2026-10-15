"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { enquiryOptions, validateEnquiry, type EnquiryErrors } from "@/lib/enquiry";

type Submission = { fingerprint: string; id: string };

export function EnquiryForm({ initialInterest = "", deliveryAvailable }: { initialInterest?: string; deliveryAvailable: boolean }) {
  const [errors, setErrors] = useState<EnquiryErrors>({});
  const [state, setState] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [notice, setNotice] = useState("");
  const formRef = useRef<HTMLFormElement>(null);
  const feedbackRef = useRef<HTMLDivElement>(null);
  const pending = useRef(false);
  const submission = useRef<Submission | null>(null);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pending.current) return;
    const form = event.currentTarget;
    const values = Object.fromEntries(new FormData(form));
    const result = validateEnquiry(values);
    setErrors(result.errors);
    if (!result.data) {
      setState("idle");
      const firstField = Object.keys(result.errors)[0];
      (form.elements.namedItem(firstField) as HTMLElement | null)?.focus();
      return;
    }

    const fingerprint = JSON.stringify(result.data);
    // Retry an unchanged message with the same key if the response was lost.
    if (submission.current?.fingerprint !== fingerprint) {
      submission.current = { fingerprint, id: crypto.randomUUID() };
    }
    pending.current = true;
    setState("sending");
    setNotice("");
    try {
      const response = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...result.data, website: values.website, submissionId: submission.current!.id }),
        signal: AbortSignal.timeout(20000),
      });
      const payload = await response.json();
      if (!response.ok || payload.ok !== true) {
        setErrors(payload.errors ?? {});
        throw new Error(payload.message ?? "We couldn't send your enquiry. Please try again or email us directly.");
      }
      setState("success");
      submission.current = null;
    } catch (error) {
      setState("error");
      setNotice(error instanceof Error && error.name !== "TimeoutError" && error.name !== "TypeError"
        ? error.message
        : "We couldn't confirm your enquiry was sent. Your details are still here. Try again or email us directly.");
    } finally {
      pending.current = false;
      requestAnimationFrame(() => feedbackRef.current?.focus());
    }
  }

  if (state === "success") return <div className="enquiry-success" ref={feedbackRef} tabIndex={-1} role="status">
    <p className="section-label">/ Thank you</p>
    <h3>Your enquiry is on its way.</h3>
    <p>We&apos;ll reply to the email you provided within one business day.</p>
    <button className="button button-small" type="button" onClick={() => { setState("idle"); setErrors({}); }}>Send another enquiry <span aria-hidden="true">&#8599;</span></button>
  </div>;

  const errorProps = (field: keyof EnquiryErrors) => ({
    "aria-invalid": errors[field] ? true as const : undefined,
    "aria-describedby": errors[field] ? `${field}-error` : undefined,
  });
  const fieldError = (field: keyof EnquiryErrors) => errors[field] && <span className="field-error" id={`${field}-error`}>{errors[field]}</span>;

  return <form className="enquiry-form" ref={formRef} onSubmit={submit} noValidate aria-label="Project enquiry" aria-busy={state === "sending"}>
    {!deliveryAvailable && <p className="form-notice" role="status">The enquiry form is temporarily unavailable. Please email <a className="text-link" href="mailto:contact@rykards.com">contact@rykards.com</a>.</p>}
    <fieldset disabled={state === "sending" || !deliveryAvailable}>
      <legend className="visually-hidden">Your enquiry details</legend>
      <div className="form-row">
        <label htmlFor="enquiry-name"><span>Your name <span aria-hidden="true">*</span></span><input id="enquiry-name" name="name" autoComplete="name" required minLength={2} maxLength={100} {...errorProps("name")} />{fieldError("name")}</label>
        <label htmlFor="enquiry-email"><span>Email address <span aria-hidden="true">*</span></span><input id="enquiry-email" name="email" type="email" autoComplete="email" required maxLength={254} {...errorProps("email")} />{fieldError("email")}</label>
      </div>
      <label htmlFor="enquiry-company"><span>Business name <span className="optional">(optional)</span></span><input id="enquiry-company" name="company" autoComplete="organization" maxLength={160} {...errorProps("company")} />{fieldError("company")}</label>
      <label htmlFor="enquiry-interest"><span>What are you interested in? <span aria-hidden="true">*</span></span><select id="enquiry-interest" name="interest" defaultValue={initialInterest} required {...errorProps("interest")}><option value="" disabled>Choose a product or service</option>{enquiryOptions.map(({ id, label }) => <option value={id} key={id}>{label}</option>)}</select>{fieldError("interest")}</label>
      <label htmlFor="enquiry-message"><span>What would you like to do? <span aria-hidden="true">*</span></span><textarea id="enquiry-message" name="message" rows={5} required minLength={20} maxLength={4000} placeholder="Tell us about your operation, what you need, and any timing you have in mind." {...errorProps("message")} />{fieldError("message")}</label>
      <div className="form-trap" aria-hidden="true"><label htmlFor="enquiry-website">Leave this field empty<input id="enquiry-website" name="website" tabIndex={-1} autoComplete="off" /></label></div>
      <p className="form-privacy">Required fields are marked *. We&apos;ll use these details to respond to your enquiry. Read our <Link className="text-link" href="/privacy">privacy policy</Link>. Please don&apos;t include passwords or patient records.</p>
      <button className="button button-small form-submit" type="submit">{state === "sending" ? "Sending your enquiry…" : "Send enquiry"} <span aria-hidden="true">&#8599;</span></button>
    </fieldset>
    {state === "error" && <div ref={feedbackRef} tabIndex={-1} className="form-notice" role="alert"><p>{notice}</p><a className="text-link" href="mailto:contact@rykards.com">Email contact@rykards.com instead</a></div>}
    <noscript><p className="form-notice">Please enable JavaScript to use this form, or email <a className="text-link" href="mailto:contact@rykards.com">contact@rykards.com</a>.</p></noscript>
  </form>;
}
