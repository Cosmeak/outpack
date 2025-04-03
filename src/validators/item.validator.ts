import { z } from "zod";
import { zfd } from "zod-form-data";

export const itemSchema = {
  product_id: z.number().int(),
  name: z.string(),
  quantity: z.coerce.number().int().optional(),
  rate: z.coerce.number().int().min(0).max(5).optional(),
  comment: z.string().optional(),
  purchased_from: z.string().optional(),
  purchased_price: z.coerce.number().optional(),
  purchased_at: z.string().optional(),
};

export const itemValidator = z.object(itemSchema);
export const itemFormValidator = zfd.formData(itemSchema);
