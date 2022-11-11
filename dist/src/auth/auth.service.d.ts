import { User } from "./entities/auth.entity";
import { CreateUserDto } from "./dto/create-user.dto";
import { JwtService } from "@nestjs/jwt";
export declare class AuthService {
    private readonly jwtService;
    private readonly model;
    constructor(jwtService: JwtService);
    create(createUserDto: CreateUserDto): Promise<{
        access_token: string;
    }>;
    login(user: any): Promise<{
        access_token: string;
    }>;
    findByEmail(email: string): Promise<User>;
}
