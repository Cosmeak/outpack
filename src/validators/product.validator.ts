import { z } from "zod";
import { zfd } from "zod-form-data";
import { brandSchema } from "./brand.validator";

export const productSchema = {
  id: z.number().int().optional(),
  brand_id: z.number(),
  name: z.string(),
  weight: z.number().optional(),
  created_at: z.string().optional(),
  updated_at: z.string().optional(),
  brand: z.object(brandSchema).optional(),
};

export const productValidator = z.object(productSchema);
export const productFormValidator = zfd.formData(productSchema);
export type Product = z.infer<typeof productValidator>;
