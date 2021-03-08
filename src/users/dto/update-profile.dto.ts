import { ApiProperty } from "@nestjs/swagger";

export class UpdateProfileDto {
  @ApiProperty()
  readonly username?: string;

  @ApiProperty()
  readonly firstName?: string;

  @ApiProperty()
  readonly lastName?: string;
}
