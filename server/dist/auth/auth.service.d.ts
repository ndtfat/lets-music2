import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthInput } from './dto/auth.input';
import { UserDTO } from 'src/user/dto/user-dto.model';
export declare class AuthService {
    private jwt;
    private prisma;
    private config;
    constructor(jwt: JwtService, prisma: PrismaService, config: ConfigService);
    signUp(payload: AuthInput): Promise<string>;
    signIn(payload: AuthInput): Promise<{
        accessToken: string;
        refreshToken: string;
        expiresAt: number;
    }>;
    refreshToken(refreshToken: string): Promise<{
        accessToken: string;
        refreshToken: string;
        expiresAt: number;
    }>;
    createToken(user: UserDTO): Promise<{
        accessToken: string;
        refreshToken: string;
        expiresAt: number;
    }>;
    validateUser(email: string, password: string): Promise<UserDTO | null>;
}
