export const config = {
  port: parseInt(process.env.PORT || "3001", 10),
  apiPrefix: process.env.API_PREFIX || "api",
  uploadsDir: process.env.UPLOADS_DIR || "uploads",
  db: {
    host: process.env.DB_HOST || "db",
    port: parseInt(process.env.DB_PORT || "5432", 10),
    user: process.env.DB_USER || "postgres",
    pass: process.env.DB_PASS || "postgres",
    name: process.env.DB_NAME || "products_db",
  },
  isProd: (process.env.NODE_ENV || "development") === "production",
};
