import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import * as express from "express";
import { join } from "path";
import { config } from "./config";
import { HttpErrorFilter } from "./common/filters/http-exception.filter";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.setGlobalPrefix(config.apiPrefix);
  app.use(
    `/${config.uploadsDir}`,
    express.static(join(__dirname, "..", config.uploadsDir))
  );
  app.useGlobalFilters(new HttpErrorFilter());

  await app.listen(config.port);
  console.log(`Server running on http://localhost:${config.port}`);
}
bootstrap();
