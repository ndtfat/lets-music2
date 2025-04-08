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
const config_1 = require("@nestjs/config");
const jwt_1 = require("@nestjs/jwt");
const argon2_1 = require("argon2");
const prisma_service_1 = require("../prisma/prisma.service");
let AuthService = class AuthService {
    jwt;
    prisma;
    config;
    constructor(jwt, prisma, config) {
        this.jwt = jwt;
        this.prisma = prisma;
        this.config = config;
    }
    async signUp(payload) {
        const hashed = (await (0, argon2_1.hash)(payload.password)).toString();
        await this.prisma.user.create({
            data: {
                email: payload.email,
                hash: hashed,
                userName: payload.email.split('@')[0],
                createdBy: payload.email,
                updatedBy: payload.email,
            },
        });
        return 'Registation successfully!';
    }
    async signIn(payload) {
        const foundUser = await this.prisma.user.findUnique({
            where: { email: payload.email },
        });
        if (!foundUser)
            throw new common_1.ForbiddenException('Email is not registered');
        const isValidPassword = await (0, argon2_1.verify)(foundUser.hash, payload.password);
        if (!isValidPassword)
            throw new common_1.ForbiddenException('Password is incorrect!');
        const { hash, ...rest } = foundUser;
        const tokens = await this.createToken(rest);
        return { ...tokens };
    }
    async refreshToken(refreshToken) {
        try {
            const payload = this.jwt.verify(refreshToken, {
                secret: this.config.get('REFRESH_TOKEN_SECRET'),
            });
            const user = await this.prisma.user.findUnique({
                where: { email: payload.email },
            });
            if (!user)
                throw new common_1.UnauthorizedException('User Not Found');
            const tokens = await this.createToken(payload);
            return { ...tokens };
        }
        catch {
            throw new common_1.UnauthorizedException('Invalid Refresh token');
        }
    }
    async createToken(user) {
        const accessToken = await this.jwt.signAsync(user, {
            expiresIn: '1h',
            secret: this.config.get('ACCESS_TOKEN_SECRET'),
        });
        const refreshToken = await this.jwt.signAsync(user, {
            expiresIn: '1d',
            secret: this.config.get('REFRESH_TOKEN_SECRET'),
        });
        const expiresAt = Date.now() + 3600 * 1000;
        return { accessToken, refreshToken, expiresAt };
    }
    async validateUser(email, password) {
        const foundUser = await this.prisma.user.findUnique({ where: { email } });
        if (!foundUser)
            return null;
        const isValidPassword = await (0, argon2_1.verify)(foundUser.hash, password);
        console.log({ isValidPassword, hash: foundUser.hash, password });
        if (!isValidPassword)
            return null;
        const { hash, ...result } = foundUser;
        return result;
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        prisma_service_1.PrismaService,
        config_1.ConfigService])
], AuthService);
//# sourceMappingURL=auth.service.js.map