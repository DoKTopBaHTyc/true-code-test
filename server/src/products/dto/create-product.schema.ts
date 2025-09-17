import { z } from 'zod';

export const createProductSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
  price: z.preprocess((v) => parseFloat(String(v)), z.number().positive()),
  discountedPrice: z.preprocess((v) => v === undefined || v === '' ? undefined : parseFloat(String(v)), z.number().positive().optional()),
  sku: z.string().min(1),
});

export type CreateProductDto = z.infer<typeof createProductSchema>;
