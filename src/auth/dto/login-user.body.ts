import { ApiProperty } from "@nestjs/swagger";

export class LoginUserBody {
  @ApiProperty()
  username: string;

  @ApiProperty()
  password: string;
}
