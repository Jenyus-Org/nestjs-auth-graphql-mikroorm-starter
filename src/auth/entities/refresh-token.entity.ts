import { User } from "../../users/entities/user.entity";
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity({ name: "refresh_tokens" })
export class RefreshToken {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.refreshTokens, { onDelete: "CASCADE" })
  @JoinColumn({ name: "user_id" })
  user: User;

  @Column({ default: false, name: "is_revoked" })
  revoked: boolean;

  @Column()
  expires: Date;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;
}
