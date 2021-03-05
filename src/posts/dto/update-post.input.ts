import {
  InputType,
  IntersectionType,
  PartialType,
  PickType,
} from "@nestjs/graphql";
import { CreatePostInput } from "./create-post.input";
import { PostObject } from "./post.object";

@InputType()
export class UpdatePostInput extends IntersectionType(
  PickType(PostObject, ["id"] as const, InputType),
  PartialType(CreatePostInput),
) {}
