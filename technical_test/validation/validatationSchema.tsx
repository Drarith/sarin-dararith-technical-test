import { z } from "zod";

const emailSchema = z.object({
  email: z.email("Enter a valid email"),
  password: z.string().min(6, "Min 6 chars"),
});

const phoneSchema = z.object({
  phoneNumber: z
    .string()
    .regex(/^[0-9]+$/, "Only numbers allowed")
    .min(8, "Min 8 digits")
    .max(15, "Max 15 digits"),
  password: z.string().min(6, "Min 6 chars"),
});

export { emailSchema, phoneSchema };
