import { Injectable } from "@nestjs/common";
import { User, UserDocument } from "./entities/auth.entity";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";

@Injectable()
export class AuthService {
    @InjectModel(User.name) private readonly model: Model<UserDocument>;
    constructor() {}
    create(createUserDto: any) {
        return "This action adds a new user";
    }
}
