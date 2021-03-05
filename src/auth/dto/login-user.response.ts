import { ApiProperty } from "@nestjs/swagger";
import { UserDto } from "../../users/dto/user.dto";

export class LoginUserResponse {
  @ApiProperty()
  user: UserDto;

  @ApiProperty()
  accessToken: string;

  @ApiProperty()
  refreshToken: string;
}
