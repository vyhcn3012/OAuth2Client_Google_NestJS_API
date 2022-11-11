import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    Req,
    UseGuards,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { GetTokenGoogleDto } from "./dto/get-token-google.dto";
import { OAuth2Client } from "google-auth-library";
import { CreateUserDto } from "./dto/create-user.dto";
import { JwtAuthGuard } from "src/guards/jwt-auth.guard";
const config = require("../../config/config").getConfig();

const client = new OAuth2Client(config.GOOGLE_CLIENT_ID);

@Controller("api/auth")
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post()
    async create(@Body() getTokenGoogleDto: GetTokenGoogleDto) {
        const ticket = await client.verifyIdToken({
            idToken: getTokenGoogleDto.token_email,
            audience: config.GOOGLE_CLIENT_ID,
        });

        const { email, name, picture } = ticket.getPayload();
        const user = new CreateUserDto({ email, name, picture });
        return this.authService.create(user);
    }

    @Get()
    @UseGuards(JwtAuthGuard)
    async getProfile(@Req() req) {
        return req.user;
    }
}
