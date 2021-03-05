import { ApiProperty } from "@nestjs/swagger";
import { UserDto } from "../../users/dto/user.dto";

export class RefreshTokenResponse {
  @ApiProperty()
  user: UserDto;

  @ApiProperty()
  accessToken: string;
}
