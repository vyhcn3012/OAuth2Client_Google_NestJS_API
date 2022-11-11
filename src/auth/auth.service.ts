import { Injectable } from "@nestjs/common";
import { User, UserDocument } from "./entities/auth.entity";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { CreateUserDto } from "./dto/create-user.dto";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
    @InjectModel(User.name) private readonly model: Model<UserDocument>;
    constructor(private readonly jwtService: JwtService) {}
    async create(createUserDto: CreateUserDto) {
        const user = await this.findByEmail(createUserDto.email);
        if (user) {
            const _user = await this.login(user);
            return _user;
        }

        const createdUser = await (
            await this.model.create(createUserDto)
        ).save();
        const result = await this.login(createdUser);
        return result;
    }

    async login(user: any) {
        const payload = {
            email: user.email,
            sub: user._id,
            name: user.name,
            picture: user.picture,
        };
        const result = { access_token: this.jwtService.sign(payload) };
        return result;
    }

    async findByEmail(email: string): Promise<User> {
        return await this.model.findOne({ email });
    }
}
