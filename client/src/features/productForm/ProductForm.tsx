import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createProductSchema } from "@/products/dto";
import { api, buildUploadUrl } from "@/shared/lib/apiClient";
import { Button } from "@/shared/ui";
import type { z } from "zod";
import { useCreateProduct, useUpdateProduct } from "@/entities/product/hooks";
import type { Product } from "@/shared/api/types";
import { useNavigate } from "react-router-dom";

type ProductFormProps = {
  product?: Product;
  onSuccess?: (product: Product) => void;
};

export const ProductForm: React.FC<ProductFormProps> = ({
  product,
  onSuccess,
}) => {
  const isEdit = !!product;
  const [file, setFile] = useState<File | null>(null);
  const navigate = useNavigate();

  const createMutation = useCreateProduct();
  const updateMutation = useUpdateProduct();

  type FormInput = z.input<typeof createProductSchema>;
  type FormOutput = z.output<typeof createProductSchema>;

  const { control, handleSubmit, reset } = useForm<
    FormInput,
    unknown,
    FormOutput
  >({
    resolver: zodResolver(createProductSchema),
    defaultValues: (product || {}) as Partial<FormInput>,
  });

  useEffect(() => {
    if (product) reset(product);
  }, [product, reset]);

  const onSubmit = async (data: FormOutput) => {
    try {
      let result: Product;
      if (isEdit) {
        result = await updateMutation.mutateAsync({ id: product!.id, data });
      } else {
        result = await createMutation.mutateAsync(data);
      }

      if (file) {
        const fd = new FormData();
        fd.append("file", file);
        await api.post(`/products/${result.id}/photo`, fd, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      onSuccess?.(result);
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-md mx-auto space-y-4"
    >
      <Controller
        name="title"
        control={control}
        render={({ field }) => (
          <input
            {...field}
            type="text"
            placeholder="Название товара"
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            required
          />
        )}
      />

      <Controller
        name="description"
        control={control}
        render={({ field }) => (
          <textarea
            {...field}
            placeholder="Описание"
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        )}
      />

      <Controller
        name="price"
        control={control}
        render={({ field }) => (
          <input
            type="number"
            min={0}
            placeholder="Цена"
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            value={field.value as number | ""}
            onChange={(e) =>
              field.onChange(
                e.target.value === "" ? undefined : Number(e.target.value)
              )
            }
            required
          />
        )}
      />

      <Controller
        name="discountedPrice"
        control={control}
        render={({ field }) => (
          <input
            type="number"
            min={0}
            placeholder="Цена со скидкой"
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            value={field.value as number | ""}
            onChange={(e) =>
              field.onChange(
                e.target.value === "" ? undefined : Number(e.target.value)
              )
            }
          />
        )}
      />

      <Controller
        name="sku"
        control={control}
        render={({ field }) => (
          <input
            {...field}
            type="text"
            placeholder="Артикул (SKU)"
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            required
          />
        )}
      />

      <div>
        <label className="block mb-1 font-medium">Фото товара</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          className="w-full"
        />
        {file && (
          <img
            src={URL.createObjectURL(file)}
            alt="preview"
            className="mt-2 w-48 h-48 object-cover rounded-lg"
          />
        )}
        {!file && product?.photoPath && (
          <img
            src={buildUploadUrl(product.photoPath)}
            alt="current"
            className="mt-2 w-48 h-48 object-cover rounded-lg"
          />
        )}
      </div>

      <Button
        type="submit"
        className="w-full"
        loading={createMutation.isPending || updateMutation.isPending}
      >
        {isEdit ? "Обновить товар" : "Создать товар"}
      </Button>
    </form>
  );
};
