import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class RegisterUserInput {
  @Field()
  username: string;

  @Field()
  password: string;
}
