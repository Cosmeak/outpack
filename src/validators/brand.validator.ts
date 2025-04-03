import { z } from "zod";
import { zfd } from "zod-form-data";

export const brandSchema = {
  name: z.string(),
};

export const brandValidator = z.object(brandSchema);
export const brandFormValidator = zfd.formData(brandSchema);
