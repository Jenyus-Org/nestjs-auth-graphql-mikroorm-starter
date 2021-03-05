import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from "typeorm";

export class PostModel1614938455304 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "posts",
        columns: [
          {
            name: "id",
            type: "int",
            isPrimary: true,
          },
          {
            name: "title",
            type: "varchar",
            isNullable: false,
          },
          {
            name: "body",
            type: "varchar",
            isNullable: false,
          },
          {
            name: "author_id",
            type: "int",
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
    );

    const foreignKey = new TableForeignKey({
      columnNames: ["author_id"],
      referencedColumnNames: ["id"],
      referencedTableName: "users",
      onDelete: "CASCADE",
    });
    await queryRunner.createForeignKey("posts", foreignKey);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable("posts");
    const foreignKey = table.foreignKeys.find((key) =>
      key.columnNames.includes("author_id"),
    );
    await queryRunner.dropForeignKey(table, foreignKey);

    await queryRunner.dropTable("posts");
  }
}
