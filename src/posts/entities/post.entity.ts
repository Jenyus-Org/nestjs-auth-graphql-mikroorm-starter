import { Entity, ManyToOne, PrimaryKey, Property } from "@mikro-orm/core";
import { User } from "../../users/entities/user.entity";

@Entity({ tableName: "posts" })
export class Post {
  @PrimaryKey()
  id: number;

  @Property()
  title: string;

  @Property()
  body: string;

  @ManyToOne(() => User, { joinColumn: "author_id", onDelete: "CASCADE" })
  author: User;

  @Property()
  createdAt: Date = new Date();

  @Property({ onUpdate: () => new Date() })
  updatedAt: Date = new Date();
}
