import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "./entities/auth.entity";
import { JwtModule } from "@nestjs/jwt";
import { JwtStrategy } from "src/strategies/jwt.strategy";
const config = require("../../config/config").getConfig();

@Module({
    imports: [
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
        JwtModule.register({
            secret: config.JWT_SECRET,
            signOptions: { expiresIn: "60s" },
        }),
    ],
    controllers: [AuthController],
    providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
