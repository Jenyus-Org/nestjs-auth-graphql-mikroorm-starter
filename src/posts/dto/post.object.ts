import { Field, Int, ObjectType } from "@nestjs/graphql";

@ObjectType("Post")
export class PostObject {
  @Field(() => Int)
  readonly id: number;

  @Field()
  readonly title: string;

  @Field()
  readonly body: string;

  @Field()
  readonly createdAt: Date;

  @Field()
  readonly updatedAt: Date;
}
