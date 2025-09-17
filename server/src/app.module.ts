import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProductsModule } from "./products/products.module";
import { join } from "path";
import { config } from "./config";
import { Controller, Get } from "@nestjs/common";

@Controller("health")
class HealthController {
  @Get()
  health() {
    return { status: "ok" };
  }
}

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "postgres",
      host: config.db.host,
      port: config.db.port,
      username: config.db.user,
      password: config.db.pass,
      database: config.db.name,
      entities: [join(__dirname, "**", "*.entity{.ts,.js}")],
      synchronize: !config.isProd,
    }),
    ProductsModule,
  ],
  controllers: [HealthController],
})
export class AppModule {}
