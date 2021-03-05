import { ApiProperty } from "@nestjs/swagger";

export class RefreshTokenBody {
  @ApiProperty()
  refreshToken: string;
}
