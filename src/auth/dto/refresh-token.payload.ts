import { Field, ObjectType } from "@nestjs/graphql";
import { UserObject } from "../../users/dto/user.object";
import { User } from "../../users/entities/user.entity";

@ObjectType()
export class RefreshTokenPayload {
  @Field(() => UserObject)
  user: User;

  @Field()
  accessToken: string;
}
