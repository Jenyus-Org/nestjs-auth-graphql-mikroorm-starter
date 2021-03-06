import { InputType, OmitType } from "@nestjs/graphql";
import { PostObject } from "./post.object";

@InputType()
export class CreatePostInput extends OmitType(
  PostObject,
  ["id", "createdAt", "updatedAt"] as const,
  InputType,
) {}
