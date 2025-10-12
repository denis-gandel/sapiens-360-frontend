import { z } from "zod";

export const instituteSchema = z
  .object({
    name: z.string().min(1),
    subdomain: z.string().min(1),
    location: z.string(),
    logo: z.url().nullable().optional(),
    email: z.email(),
    phone: z.string().min(1),
    foundation_date: z.date(),
    start_date: z.date(),
    end_date: z.date(),
    type_id: z.number().int(),
    nature_id: z.number().int(),
    period_id: z.number().int(),
    country_id: z.number().int(),
    state_id: z.number().int(),
    city_id: z.number().int(),
    district_id: z.number().int().nullable().optional(),
  })
  .refine((data) => data.end_date > data.start_date, {
    message: "end_date must be greater than start_date",
    path: ["end_date"],
  });

export type InstituteInput = z.infer<typeof instituteSchema>;
