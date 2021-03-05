import {
  InputType,
  IntersectionType,
  OmitType,
  PartialType,
  PickType,
} from "@nestjs/graphql";
import { UserObject } from "./user.object";

@InputType()
export class UpdateUserInput extends IntersectionType(
  PickType(UserObject, ["id"] as const, InputType),
  PartialType(OmitType(UserObject, ["id"] as const, InputType)),
) {}
