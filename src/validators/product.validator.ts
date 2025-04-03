import { z } from "zod";
import { zfd } from "zod-form-data";

export const productSchema = {
  brand_id: z.number(),
  category: z.string(),
  name: z.string(),
  weight: z.number().optional(),
  is_consumable: z.boolean().default(false),
};

export const productValidator = z.object(productSchema);
export const productFormValidator = zfd.formData(productSchema);
