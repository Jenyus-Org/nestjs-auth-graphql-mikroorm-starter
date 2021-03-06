import { Migration } from "@mikro-orm/migrations";

export class Migration20210306174723 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      "create table `users` (`id` integer not null primary key autoincrement, `username` varchar not null, `password` varchar not null, `first_name` varchar null, `last_name` varchar null, `created_at` datetime not null, `updated_at` datetime not null);",
    );

    this.addSql(
      "create table `posts` (`id` integer not null primary key autoincrement, `title` varchar not null, `body` varchar not null, `created_at` datetime not null, `updated_at` datetime not null);",
    );

    this.addSql(
      "create table `refresh_tokens` (`id` integer not null primary key autoincrement, `is_revoked` text not null, `expires` datetime not null, `created_at` datetime not null, `updated_at` datetime not null);",
    );

    this.addSql("alter table `posts` add column `author_id` integer null;");
    this.addSql(
      "create index `posts_author_id_index` on `posts` (`author_id`);",
    );

    this.addSql(
      "alter table `refresh_tokens` add column `user_id` integer null;",
    );
    this.addSql(
      "create index `refresh_tokens_user_id_index` on `refresh_tokens` (`user_id`);",
    );
  }

  async down() {
    this.addSql(
      this.getKnex()
        .schema.alterTable("posts", (table) => {
          table.dropForeign(["posts_author_id_index"]);
          table.dropColumn("author_id");
        })
        .toQuery(),
    );

    this.addSql(
      this.getKnex()
        .schema.alterTable("refresh_tokens", (table) => {
          table.dropForeign(["refresh_tokens_user_id_index"]);
          table.dropColumn("user_id");
        })
        .toQuery(),
    );

    this.addSql(
      this.getKnex()
        .schema.dropTable("users")
        .dropTable("posts")
        .dropTable("refresh_tokens")
        .toQuery(),
    );
  }
}
