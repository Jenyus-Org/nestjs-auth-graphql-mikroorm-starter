import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { UserInputError } from "apollo-server-express";
import { AuthService } from "./auth.service";
import { LoginUserInput } from "./dto/login-user.input";
import { LoginUserPayload } from "./dto/login-user.payload";
import { RefreshTokenInput } from "./dto/refresh-token.input";
import { RefreshTokenPayload } from "./dto/refresh-token.payload";
import { RegisterUserInput } from "./dto/register-user.input";
import { RegisterUserPayload } from "./dto/register-user.payload";

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation(() => LoginUserPayload)
  async login(@Args("input") input: LoginUserInput) {
    const user = await this.authService.validateUser(
      input.username,
      input.password,
    );

    if (!user) {
      return new UserInputError("Username or password incorrect.");
    }

    const accessToken = await this.authService.generateAccessToken(user);
    const refreshToken = await this.authService.generateRefreshToken(
      user,
      60 * 60 * 24 * 30,
    );

    const payload = new LoginUserPayload();
    payload.user = user;
    payload.accessToken = accessToken;
    payload.refreshToken = refreshToken;

    return payload;
  }

  @Mutation(() => RefreshTokenPayload)
  async refreshToken(@Args("input") input: RefreshTokenInput) {
    const {
      user,
      token,
    } = await this.authService.createAccessTokenFromRefreshToken(
      input.refreshToken,
    );

    const payload = new RefreshTokenPayload();
    payload.user = user;
    payload.accessToken = token;

    return payload;
  }

  @Mutation(() => RegisterUserPayload)
  async register(@Args("input") input: RegisterUserInput) {
    const user = await this.authService.register(
      input.username,
      input.password,
    );

    if (!user) {
      return new UserInputError(
        `User by username ${input.username} already exists.`,
      );
    }

    const accessToken = await this.authService.generateAccessToken(user);
    const refreshToken = await this.authService.generateRefreshToken(
      user,
      60 * 60 * 24 * 30,
    );

    const payload = new RegisterUserPayload();
    payload.user = user;
    payload.accessToken = accessToken;
    payload.refreshToken = refreshToken;

    return payload;
  }
}
