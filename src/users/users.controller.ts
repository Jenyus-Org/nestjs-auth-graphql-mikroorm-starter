import { Body, Controller, Get, Param, Put, UseGuards } from "@nestjs/common";
import { ApiOkResponse } from "@nestjs/swagger";
import { CurrentUser } from "src/auth/decorator/current-user.decorator";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { UpdateProfileDto } from "./dto/update-profile.dto";
import { UserDto } from "./dto/user.dto";
import { User } from "./entities/user.entity";
import { UsersService } from "./users.service";

@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async findAll() {
    const users = await this.usersService.findAll();
    return users.map((u) => new UserDto(u));
  }

  @Get(":username")
  async findOne(@Param("username") username: string) {
    const user = await this.usersService.findOne({ username });
    return user && new UserDto(user);
  }

  @UseGuards(JwtAuthGuard)
  @Put("profile")
  async update(
    @CurrentUser() user: User,
    @Body() updateUserDto: UpdateProfileDto,
  ) {
    const res = await this.usersService.update(user.id, updateUserDto);
    return res && new UserDto(res);
  }

  @UseGuards(JwtAuthGuard)
  @Get("me")
  @ApiOkResponse({
    description: "Returns the logged-in user.",
    type: UserDto,
  })
  getProfile(@CurrentUser() user: User) {
    return user && new UserDto(user);
  }
}
