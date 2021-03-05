import { Selections } from "@jenyus-org/nestjs-graphql-utils";
import { UnauthorizedException, UseGuards } from "@nestjs/common";
import {
  Args,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from "@nestjs/graphql";
import { UsersService } from "src/users/users.service";
import { GqlCurrentUser } from "../auth/decorator/gql-current-user.decorator";
import { GqlAuthGuard } from "../auth/guards/gql-auth.guard";
import { UserObject } from "../users/dto/user.object";
import { User } from "../users/entities/user.entity";
import { CreatePostInput } from "./dto/create-post.input";
import { PostObject } from "./dto/post.object";
import { UpdatePostInput } from "./dto/update-post.input";
import { Post } from "./entities/post.entity";
import { PostsService } from "./posts.service";

@Resolver(() => PostObject)
export class PostsResolver {
  constructor(
    private readonly postsService: PostsService,
    private usersService: UsersService,
  ) {}

  @Query(() => [PostObject])
  posts(@Selections("posts", ["author"]) relations: string[]) {
    return this.postsService.findAll({ relations });
  }

  @Query(() => PostObject)
  post(
    @Selections("post", ["author"]) relations: string[],
    @Args("id", { type: () => Int }) id: number,
  ) {
    return this.postsService.findOne({ id, relations });
  }

  @Mutation(() => PostObject)
  @UseGuards(GqlAuthGuard)
  createPost(
    @GqlCurrentUser() user: User,
    @Args("input") input: CreatePostInput,
  ) {
    return this.postsService.create(user.id, input);
  }

  @Mutation(() => PostObject)
  @UseGuards(GqlAuthGuard)
  async updatePost(
    @GqlCurrentUser() user: User,
    @Args("input") input: UpdatePostInput,
  ) {
    const post = await this.postsService.findOne({
      id: input.id,
      relations: ["author"],
    });
    if (post.author.id !== user.id) {
      throw new UnauthorizedException("You aren't the author of this post.");
    }
    return this.postsService.update(input.id, input);
  }

  @Mutation(() => Boolean)
  @UseGuards(GqlAuthGuard)
  async deletePost(
    @GqlCurrentUser() user: User,
    @Args("id", { type: () => Int }) id: number,
  ) {
    const post = await this.postsService.findOne({
      id: +id,
      relations: ["author"],
    });
    if (post.author.id !== user.id) {
      throw new UnauthorizedException("You aren't the author of this post.");
    }
    return this.postsService.remove(id);
  }

  @ResolveField(() => UserObject)
  async author(@Parent() post: Post) {
    if (post.author) {
      return post.author;
    }
    return await this.usersService.findOne({ postId: post.id });
  }
}
