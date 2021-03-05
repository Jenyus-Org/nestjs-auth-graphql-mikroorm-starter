import { forwardRef, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PostsModule } from "../posts/posts.module";
import { User } from "./entities/user.entity";
import { UsersController } from "./users.controller";
import { UsersResolver } from "./users.resolver";
import { UsersService } from "./users.service";

@Module({
  imports: [TypeOrmModule.forFeature([User]), forwardRef(() => PostsModule)],
  controllers: [UsersController],
  providers: [UsersResolver, UsersService],
  exports: [UsersService],
})
export class UsersModule {}
