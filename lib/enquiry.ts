import { solutions } from "./solutions";

export const enquiryOptions = [
  ...solutions.map(({ id, name }) => ({ id, label: name })),
  { id: "custom", label: "Custom software engineering" },
  { id: "integrations", label: "Integrations & automation" },
  { id: "unsure", label: "I'd like your advice" },
];

export function getEnquiryHref(interest: string) {
  return `/contact?interest=${encodeURIComponent(interest)}#enquiry`;
}

export function getEnquiryOption(interest: unknown) {
  return enquiryOptions.find((option) => option.id === interest);
}

export type Enquiry = {
  name: string;
  email: string;
  company: string;
  interest: string;
  message: string;
};

export type EnquiryErrors = Partial<Record<keyof Enquiry, string>>;

export function validateEnquiry(input: unknown): { data?: Enquiry; errors: EnquiryErrors } {
  const value = input && typeof input === "object" && !Array.isArray(input)
    ? input as Record<string, unknown> : {};
  const read = (field: keyof Enquiry) => typeof value[field] === "string" ? value[field].trim() : "";
  const data: Enquiry = {
    name: read("name"), email: read("email"), company: read("company"),
    interest: read("interest"), message: read("message"),
  };
  const errors: EnquiryErrors = {};
  if (data.name.length < 2 || data.name.length > 100 || /[\r\n\x00-\x1f]/.test(data.name)) {
    errors.name = "Enter your name (2–100 characters).";
  }
  if (data.email.length > 254 || !/^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(data.email) || /[\x00-\x1f]/.test(data.email)) {
    errors.email = "Enter a valid email address.";
  }
  if (data.company.length > 160 || /[\r\n\x00-\x1f]/.test(data.company)) {
    errors.company = "Use 160 characters or fewer for your business name.";
  }
  if (!getEnquiryOption(data.interest)) errors.interest = "Choose a product or service.";
  if (data.message.length < 20 || data.message.length > 4000 || /\x00/.test(data.message)) {
    errors.message = "Tell us a little more (20–4,000 characters).";
  }
  return Object.keys(errors).length ? { errors } : { data, errors };
}
