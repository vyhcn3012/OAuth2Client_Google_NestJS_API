import { UserService } from "../user/user.service";
import { JwtService } from "@nestjs/jwt";
declare const LocalStrategy_base: new (...args: any[]) => any;
export declare class LocalStrategy extends LocalStrategy_base {
    private userService;
    private jwtService;
    constructor(userService: UserService, jwtService: JwtService);
    validate(username: string, password: string): Promise<any>;
}
export {};
