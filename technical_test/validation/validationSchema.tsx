import { z } from "zod";

const emailFieldSchema = z.email("Please enter a valid email address");

const phoneFieldSchema = z
  .string()
  .regex(/^[0-9]+$/, "Only numbers allowed")
  .min(8, "Phone number must be 8 digits or more")
  .max(15, "Phone number must be less than 15 digits");

const passwordFieldSchema = z.string().min(6, "Password must be more than 6 characters");

const emailSchema = z.object({
  email: emailFieldSchema,
  password: passwordFieldSchema,
});

const phoneSchema = z.object({
  phoneNumber: phoneFieldSchema,
  password: passwordFieldSchema,
});

export type FormEmailData = z.infer<typeof emailSchema>;
export type FormPhoneData = z.infer<typeof phoneSchema>;

export { emailSchema, phoneSchema };
