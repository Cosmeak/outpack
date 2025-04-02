import { z } from "zod";
import { zfd } from "zod-form-data";

export const brandSchema = {
  id: z.number().int().optional(),
  name: z.string(),
  created_at: z.string().optional(),
  updated_at: z.string().optional(),
};

export const brandValidator = z.object(brandSchema);
export const brandFormValidator = zfd.formData(brandSchema);
export type Brand = z.infer<typeof brandValidator>;
