"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
const auth_resolver_1 = require("./auth.resolver");
const jwt_1 = require("@nestjs/jwt");
const passport_1 = require("@nestjs/passport");
const prisma_service_1 = require("../prisma/prisma.service");
const config_1 = require("@nestjs/config");
const jwt_strategy_1 = require("./strategies/jwt.strategy");
const local_strategy_1 = require("./strategies/local.strategy");
let AuthModule = class AuthModule {
};
exports.AuthModule = AuthModule;
exports.AuthModule = AuthModule = __decorate([
    (0, common_1.Module)({
        imports: [
            passport_1.PassportModule,
            jwt_1.JwtModule.registerAsync({
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
                useFactory: (configService) => ({
                    secret: configService.get('ACCESS_TOKEN_SECRET'),
                }),
            }),
        ],
        providers: [
            auth_service_1.AuthService,
            auth_resolver_1.AuthResolver,
            jwt_strategy_1.JwtStrategy,
            local_strategy_1.LocalStrategy,
            prisma_service_1.PrismaService,
            config_1.ConfigService,
        ],
    })
], AuthModule);
//# sourceMappingURL=auth.module.js.map