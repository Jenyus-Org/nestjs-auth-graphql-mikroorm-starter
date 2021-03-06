import { Logger } from "@nestjs/common";
import { Options } from "@mikro-orm/core";
import { SqlHighlighter } from "@mikro-orm/sql-highlighter";

const logger = new Logger("MikroORM");
const config = {
  type: "sqlite",
  dbName: "./tmp/data.sqlite",
  entities: ["./dist/**/*.entity.js"],
  entitiesTs: ["./src/**/*.entity.ts"],
  debug: true,
  highlighter: new SqlHighlighter(),
  migrations: {
    path: "./src/database/migrations",
  },
  logger: logger.log.bind(logger),
} as Options;

export default config;
