import { RefreshToken } from "src/auth/entities/refresh-token.entity";
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Post } from "../../posts/entities/post.entity";

@Entity({ name: "users" })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column({ name: "first_name", nullable: true })
  firstName: string;

  @Column({ name: "last_name", nullable: true })
  lastName: string;

  @OneToMany(() => Post, (post) => post.author, { cascade: true })
  posts: Post[];

  @OneToMany(() => RefreshToken, (refreshToken) => refreshToken.user, {
    cascade: true,
  })
  refreshTokens: RefreshToken[];

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;
}
