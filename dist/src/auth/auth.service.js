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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const auth_entity_1 = require("./entities/auth.entity");
const mongoose_1 = require("mongoose");
const mongoose_2 = require("@nestjs/mongoose");
const jwt_1 = require("@nestjs/jwt");
let AuthService = class AuthService {
    constructor(jwtService) {
        this.jwtService = jwtService;
    }
    async create(createUserDto) {
        const user = await this.findByEmail(createUserDto.email);
        if (user) {
            const _user = await this.login(user);
            return _user;
        }
        const createdUser = await (await this.model.create(createUserDto)).save();
        const result = await this.login(createdUser);
        return result;
    }
    async login(user) {
        const payload = {
            email: user.email,
            sub: user._id,
            name: user.name,
            picture: user.picture,
        };
        const result = { access_token: this.jwtService.sign(payload) };
        return result;
    }
    async findByEmail(email) {
        return await this.model.findOne({ email });
    }
};
__decorate([
    (0, mongoose_2.InjectModel)(auth_entity_1.User.name),
    __metadata("design:type", mongoose_1.Model)
], AuthService.prototype, "model", void 0);
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map