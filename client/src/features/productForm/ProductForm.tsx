import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createProductSchema } from "../../products/dto";
import type { z } from "zod";
import {
  TextInput,
  NumberInput,
  Button,
  Textarea,
  FileInput,
  Group,
  Image,
} from "@mantine/core";
import {
  useCreateProduct,
  useUpdateProduct,
} from "../../entities/product/hooks";
import type { Product } from "../../entities/product/types";

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

  const createMutation = useCreateProduct();
  const updateMutation = useUpdateProduct();

  type FormInput = z.input<typeof createProductSchema>;
  type FormOutput = z.output<typeof createProductSchema>;

  const { control, handleSubmit, reset } = useForm<FormInput, any, FormOutput>({
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
        await fetch(
          `${import.meta.env.VITE_API_URL || "http://localhost:3001"}/api/products/${result.id}/photo`,
          {
            method: "POST",
            body: fd,
          }
        );
      }

      onSuccess?.(result);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      style={{ maxWidth: 400, margin: "0 auto" }}
    >
      <Controller
        name="title"
        control={control}
        render={({ field }) => <TextInput label="Title" {...field} required />}
      />
      <Controller
        name="description"
        control={control}
        render={({ field }) => <Textarea label="Description" {...field} />}
      />
      <Controller
        name="price"
        control={control}
        render={({ field }) => (
          <NumberInput
            label="Price"
            min={0}
            required
            value={
              typeof field.value === "number"
                ? field.value
                : field.value === undefined ||
                    field.value === null ||
                    field.value === ""
                  ? undefined
                  : Number(field.value)
            }
            onChange={(val) => field.onChange(val === "" ? undefined : val)}
            onBlur={field.onBlur}
            name={field.name}
            ref={field.ref}
          />
        )}
      />
      <Controller
        name="discountedPrice"
        control={control}
        render={({ field }) => (
          <NumberInput
            label="Discounted Price"
            min={0}
            value={
              typeof field.value === "number"
                ? field.value
                : field.value === undefined ||
                    field.value === null ||
                    field.value === ""
                  ? undefined
                  : Number(field.value)
            }
            onChange={(val) => field.onChange(val === "" ? undefined : val)}
            onBlur={field.onBlur}
            name={field.name}
            ref={field.ref}
          />
        )}
      />
      <Controller
        name="sku"
        control={control}
        render={({ field }) => <TextInput label="SKU" {...field} required />}
      />
      <FileInput
        label="Photo"
        placeholder="Select image"
        accept="image/*"
        value={file}
        onChange={setFile}
      />
      {file && (
        <Image
          src={URL.createObjectURL(file)}
          alt="preview"
          width={200}
          height={200}
          mt="sm"
        />
      )}
      {product?.photoPath && !file && (
        <Image
          src={`${import.meta.env.VITE_API_URL || "http://localhost:3001"}${product.photoPath}`}
          alt="current"
          width={200}
          height={200}
          mt="sm"
        />
      )}
      <Group mt="md">
        <Button type="submit">{isEdit ? "Update" : "Create"}</Button>
      </Group>
    </form>
  );
};
