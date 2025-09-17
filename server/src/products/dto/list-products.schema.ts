import { z } from "zod";

export const listProductsSchema = z.object({
  page: z
    .preprocess(
      (v) => (v === undefined ? undefined : parseInt(String(v), 10)),
      z.number().int().min(1).optional()
    )
    .default(1),
  limit: z
    .preprocess(
      (v) => (v === undefined ? undefined : parseInt(String(v), 10)),
      z.number().int().min(1).max(100).optional()
    )
    .default(10),
  q: z.string().trim().optional().default(""),
  minPrice: z.preprocess(
    (v) => (v === undefined || v === "" ? undefined : parseFloat(String(v))),
    z.number().nonnegative().optional()
  ),
  maxPrice: z.preprocess(
    (v) => (v === undefined || v === "" ? undefined : parseFloat(String(v))),
    z.number().nonnegative().optional()
  ),
  sortBy: z
    .enum(["title", "price", "discountedPrice", "sku"])
    .optional()
    .default("title"),
  order: z.enum(["asc", "desc"]).optional().default("asc"),
});

export type ListProductsDto = z.infer<typeof listProductsSchema>;
