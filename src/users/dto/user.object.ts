import { Field, Int, ObjectType } from "@nestjs/graphql";

@ObjectType("User")
export class UserObject {
  @Field(() => Int)
  readonly id: number;

  @Field()
  readonly username: string;

  @Field({ nullable: true })
  readonly firstName: string;

  @Field({ nullable: true })
  readonly lastName: string;
}
