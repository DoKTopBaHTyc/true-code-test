import {
  Controller,
  Post,
  Body,
  Get,
  Query,
  Param,
  Patch,
  Delete,
  UploadedFile,
  UseInterceptors,
} from "@nestjs/common";
import { ProductsService } from "./products.service";
import { createProductSchema } from "./dto/create-product.schema";
import { updateProductSchema } from "./dto/update-product.schema";
import { ZodValidationPipe } from "../common/pipes/zod-validation.pipe";
import { listProductsSchema } from "./dto/list-products.schema";
import { FileInterceptor } from "@nestjs/platform-express";
import * as fs from "fs";
import {
  getImageMulterOptions,
  toPublicUploadPath,
  toAbsoluteUploadPath,
} from "../common/upload/upload.util";

@Controller("products")
export class ProductsController {
  constructor(private readonly service: ProductsService) {}

  @Post()
  create(@Body(new ZodValidationPipe(createProductSchema)) body: any) {
    return this.service.create(body as any);
  }

  @Get()
  findAll(@Query(new ZodValidationPipe(listProductsSchema)) query: any) {
    return this.service.findAll(query);
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.service.findOne(id);
  }

  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body(new ZodValidationPipe(updateProductSchema)) body: any
  ) {
    return this.service.update(id, body);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.service.remove(id);
  }

  @Post(":id/photo")
  @UseInterceptors(FileInterceptor("file", getImageMulterOptions()))
  async uploadPhoto(
    @Param("id") id: string,
    @UploadedFile() file: Express.Multer.File
  ) {
    const path = file ? toPublicUploadPath(file.filename) : null;
    return this.service.update(id, { photoPath: path } as any);
  }

  @Delete(":id/photo")
  async deletePhoto(@Param("id") id: string) {
    const p = await this.service.findOne(id);
    if (p.photoPath) {
      const abs = toAbsoluteUploadPath(p.photoPath);
      try {
        fs.unlinkSync(abs);
      } catch {}
      return this.service.update(id, { photoPath: null } as any);
    }
    return { ok: true };
  }
}
