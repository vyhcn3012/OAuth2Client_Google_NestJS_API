import { AuthService } from "./auth.service";
import { GetTokenGoogleDto } from "./dto/get-token-google.dto";
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    create(getTokenGoogleDto: GetTokenGoogleDto): Promise<{
        access_token: string;
    }>;
    getProfile(req: any): Promise<any>;
}
