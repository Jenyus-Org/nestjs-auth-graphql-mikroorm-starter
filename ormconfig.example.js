const { join } = require("path");

module.exports = {
  type: "sqlite",
  synchronize: true,
  entities: ["dist/**/*.entity.js"],
  database: "tmp/data.sqlite",
  migrations: [join(__dirname, "database", "migrations", "*.ts")],
  cli: {
    migrationsDir: "src/database/migrations",
  },
};
