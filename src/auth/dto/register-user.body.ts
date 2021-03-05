import { ApiProperty } from "@nestjs/swagger";

export class RegisterUserBody {
  @ApiProperty()
  username: string;

  @ApiProperty()
  password: string;
}
