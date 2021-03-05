import { ApiProperty } from "@nestjs/swagger";

export class UpdateUserDto {
  @ApiProperty()
  readonly username?: string;

  @ApiProperty()
  readonly firstName?: string;

  @ApiProperty()
  readonly lastName?: string;
}
