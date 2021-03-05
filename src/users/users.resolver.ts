import { Selections } from "@jenyus-org/nestjs-graphql-utils";
import { UseGuards } from "@nestjs/common";
import {
  Args,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from "@nestjs/graphql";
import { UserInputError } from "apollo-server-express";
import { PostObject } from "src/posts/dto/post.object";
import { PostsService } from "src/posts/posts.service";
import { GqlCurrentUser } from "../auth/decorator/gql-current-user.decorator";
import { GqlAuthGuard } from "../auth/guards/gql-auth.guard";
import { UpdateUserInput } from "./dto/update-user.input";
import { UserObject } from "./dto/user.object";
import { User } from "./entities/user.entity";
import { UsersService } from "./users.service";

@Resolver(() => UserObject)
export class UsersResolver {
  constructor(
    private readonly usersService: UsersService,
    private postsService: PostsService,
  ) {}

  @Query(() => [UserObject])
  users(@Selections("user", ["posts"]) relations: string[]) {
    return this.usersService.findAll({ relations });
  }

  @Query(() => UserObject)
  user(
    @Args("id", { type: () => Int, nullable: true }) id?: number,
    @Args("username", { nullable: true }) username?: string,
  ) {
    if (!id && !username) {
      throw new UserInputError("Arguments must be one of ID or username.");
    }
    return this.usersService.findOne({ id, username });
  }

  @Mutation(() => UserObject)
  updateProfile(@Args("input") input: UpdateUserInput) {
    return this.usersService.update(input.id, input);
  }

  @Query(() => UserObject)
  @UseGuards(GqlAuthGuard)
  me(@GqlCurrentUser() user: User) {
    return user;
  }

  @ResolveField(() => [PostObject])
  async posts(@Parent() user: User) {
    if (user.posts && user.posts.length) {
      return user.posts;
    }
    const { id } = user;
    return this.postsService.findAll({ authorId: id });
  }
}
