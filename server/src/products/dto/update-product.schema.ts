import { createProductSchema } from './create-product.schema';
import { z } from 'zod';

export const updateProductSchema = createProductSchema.partial();
export type UpdateProductDto = z.infer<typeof updateProductSchema>;
