import { InputType, OmitType, PartialType } from "@nestjs/graphql";
import { UserObject } from "./user.object";

@InputType()
export class UpdateProfileInput extends PartialType(
  OmitType(UserObject, ["id"] as const, InputType),
) {}
