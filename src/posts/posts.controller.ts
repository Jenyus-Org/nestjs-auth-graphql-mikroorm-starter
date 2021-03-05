import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UnauthorizedException,
  UseGuards,
} from "@nestjs/common";
import { CurrentUser } from "src/auth/decorator/current-user.decorator";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { User } from "src/users/entities/user.entity";
import { CreatePostDto } from "./dto/create-post.dto";
import { UpdatePostDto } from "./dto/update-post.dto";
import { PostsService } from "./posts.service";

@Controller("posts")
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@CurrentUser() user: User, @Body() createPostDto: CreatePostDto) {
    return this.postsService.create(user.id, createPostDto);
  }

  @Get()
  findAll() {
    return this.postsService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.postsService.findOne({ id: +id });
  }

  @UseGuards(JwtAuthGuard)
  @Put(":id")
  async update(
    @CurrentUser() user: User,
    @Param("id") id: string,
    @Body() updatePostDto: UpdatePostDto,
  ) {
    const post = await this.postsService.findOne({
      id: +id,
      relations: ["author"],
    });
    if (post.author.id !== user.id) {
      throw new UnauthorizedException("You aren't the author of this post.");
    }
    return this.postsService.update(+id, updatePostDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(":id")
  async remove(@CurrentUser() user: User, @Param("id") id: string) {
    const post = await this.postsService.findOne({
      id: +id,
      relations: ["author"],
    });
    if (post.author.id !== user.id) {
      throw new UnauthorizedException("You aren't the author of this post.");
    }
    return this.postsService.remove(+id);
  }
}
