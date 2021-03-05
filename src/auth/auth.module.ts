import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsersModule } from "../users/users.module";
import { AuthController } from "./auth.controller";
import { AuthResolver } from "./auth.resolver";
import { AuthService } from "./auth.service";
import { RefreshToken } from "./entities/refresh-token.entity";
import { JwtStrategy } from "./strategies/jwt.strategy";
import { LocalStrategy } from "./strategies/local.strategy";

@Module({
  controllers: [AuthController],
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>("auth.jwtKey"),
        signOptions: { expiresIn: "15m" },
      }),
      inject: [ConfigService],
    }),
    UsersModule,
    TypeOrmModule.forFeature([RefreshToken]),
  ],
  providers: [AuthService, AuthResolver, LocalStrategy, JwtStrategy],
})
export class AuthModule {}
