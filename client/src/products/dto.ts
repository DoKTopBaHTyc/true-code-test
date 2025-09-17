import { z } from "zod";

export const createProductSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  price: z.preprocess((v) => parseFloat(String(v)), z.number().positive()),
  discountedPrice: z.preprocess(
    (v) => (v === undefined || v === "" ? undefined : parseFloat(String(v))),
    z.number().positive().optional()
  ),
  sku: z.string().min(1, "SKU is required"),
});

export const updateProductSchema = createProductSchema.partial();

export type CreateProductDto = z.infer<typeof createProductSchema>;
export type UpdateProductDto = z.infer<typeof updateProductSchema>;
