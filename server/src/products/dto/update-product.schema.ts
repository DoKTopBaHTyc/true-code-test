import { z } from "zod";

const MAX_PRICE = 99_999_999.99;

export const updateProductSchema = z
  .object({
    title: z.string().min(1).optional(),
    description: z.string().optional(),
    price: z.preprocess(
      (v) => (v === undefined ? undefined : parseFloat(String(v))),
      z.number().positive().max(MAX_PRICE).optional()
    ),
    discountedPrice: z.preprocess(
      (v) => (v === undefined || v === "" ? undefined : parseFloat(String(v))),
      z.number().positive().max(MAX_PRICE).optional()
    ),
    sku: z.string().min(1).optional(),
  })
  .refine(
    (d) =>
      d.price === undefined || d.discountedPrice === undefined
        ? true
        : d.discountedPrice <= d.price,
    {
      message: "discountedPrice must be <= price",
      path: ["discountedPrice"],
    }
  );

export type UpdateProductDto = z.infer<typeof updateProductSchema>;
