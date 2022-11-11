"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
const get_token_google_dto_1 = require("./dto/get-token-google.dto");
const google_auth_library_1 = require("google-auth-library");
const create_user_dto_1 = require("./dto/create-user.dto");
const jwt_auth_guard_1 = require("../guards/jwt-auth.guard");
const config = require("../../config/config").getConfig();
const client = new google_auth_library_1.OAuth2Client(config.GOOGLE_CLIENT_ID);
let AuthController = class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    async create(getTokenGoogleDto) {
        const ticket = await client.verifyIdToken({
            idToken: getTokenGoogleDto.token_email,
            audience: config.GOOGLE_CLIENT_ID,
        });
        const { email, name, picture } = ticket.getPayload();
        const user = new create_user_dto_1.CreateUserDto({ email, name, picture });
        return this.authService.create(user);
    }
    async getProfile(req) {
        return req.user;
    }
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [get_token_google_dto_1.GetTokenGoogleDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "getProfile", null);
AuthController = __decorate([
    (0, common_1.Controller)("api/auth"),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map