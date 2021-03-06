import { Entity, ManyToOne, PrimaryKey, Property } from "@mikro-orm/core";
import { User } from "../../users/entities/user.entity";

@Entity({ tableName: "refresh_tokens" })
export class RefreshToken {
  @PrimaryKey()
  id: number;

  @ManyToOne(() => User, { onDelete: "CASCADE", joinColumn: "user_id" })
  user: User;

  @Property({ name: "is_revoked" })
  revoked = false;

  @Property()
  expires: Date;

  @Property()
  createdAt: Date = new Date();

  @Property({ onUpdate: () => new Date() })
  updatedAt: Date = new Date();
}
