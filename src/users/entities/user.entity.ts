import {
  Cascade,
  Collection,
  Entity,
  OneToMany,
  Property,
} from "@mikro-orm/core";
import { RefreshToken } from "../../auth/entities/refresh-token.entity";
import { BaseEntity } from "../../database/entities/base-entity.entity";
import { Post } from "../../posts/entities/post.entity";

@Entity({ tableName: "users" })
export class User extends BaseEntity {
  @Property()
  username: string;

  @Property()
  password: string;

  @Property({ nullable: true })
  firstName: string;

  @Property({ nullable: true })
  lastName: string;

  @OneToMany(() => Post, (post) => post.author, { cascade: [Cascade.REMOVE] })
  posts = new Collection<Post>(this);

  @OneToMany(() => RefreshToken, (refreshToken) => refreshToken.user, {
    cascade: [Cascade.REMOVE],
  })
  refreshTokens = new Collection<RefreshToken>(this);
}
