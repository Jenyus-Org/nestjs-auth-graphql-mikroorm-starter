import { MikroOrmModule } from "@mikro-orm/nestjs";
import { forwardRef, Module } from "@nestjs/common";
import { UsersModule } from "src/users/users.module";
import { Post } from "./entities/post.entity";
import { PostsController } from "./posts.controller";
import { PostsResolver } from "./posts.resolver";
import { PostsService } from "./posts.service";

@Module({
  controllers: [PostsController],
  imports: [MikroOrmModule.forFeature([Post]), forwardRef(() => UsersModule)],
  providers: [PostsService, PostsResolver],
  exports: [PostsService],
})
export class PostsModule {}
