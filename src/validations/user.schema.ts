import { z } from "zod";

export const userSchema = z.object({
  id: z.uuidv4(),
  name: z.string().min(1),
  firstnames: z.string().min(1),
  lastnames: z.string().min(1),
  shortname: z.string().min(1),
  code: z.string().nullable().optional(),
  ci: z.string().min(1),
  image_url: z.url().nullable().optional(),
  address: z.string().nullable().optional(),
  phone: z.string().nullable().optional(),
  email: z.email(),
  password: z.string().min(6),
  gender: z.enum(["M", "F"]),
  birthdate: z.date().nullable().optional(),
  role_id: z.number().int(),
  is_active: z.boolean().default(true),
  created_at: z.date(),
  updated_at: z.date(),
  deleted_at: z.date().nullable().optional(),
  lms_id: z.uuid().nullable().optional(),
  tenant_id: z.uuid(),
});

export type UserInput = z.infer<typeof userSchema>;
