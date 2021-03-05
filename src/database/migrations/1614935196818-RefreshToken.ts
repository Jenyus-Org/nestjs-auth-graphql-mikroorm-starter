import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from "typeorm";

export class RefreshToken1614935196818 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "refresh_tokens",
        columns: [
          {
            name: "id",
            type: "int",
            isPrimary: true,
          },
          {
            name: "user_id",
            type: "int",
            isNullable: false,
          },
          {
            name: "is_revoked",
            type: "bool",
            default: false,
            isNullable: false,
          },
          {
            name: "expires",
            type: "timestamp",
            isNullable: false,
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "now()",
          },
          {
            name: "updated_at",
            type: "timestamp",
            default: "now()",
          },
        ],
      }),
      true,
    );

    const foreignKey = new TableForeignKey({
      columnNames: ["user_id"],
      referencedColumnNames: ["id"],
      referencedTableName: "users",
      onDelete: "CASCADE",
    });
    await queryRunner.createForeignKey("refresh_tokens", foreignKey);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable("refresh_tokens");
    const foreignKey = table.foreignKeys.find((key) =>
      key.columnNames.includes("user_id"),
    );
    await queryRunner.dropForeignKey(table, foreignKey);
    await queryRunner.dropTable("refresh_tokens");
  }
}
