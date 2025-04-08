import { AuthService } from './auth.service';
import { AuthInput } from './dto/auth.input';
export declare class AuthResolver {
    private readonly authService;
    constructor(authService: AuthService);
    signIn(payload: AuthInput): Promise<{
        accessToken: string;
        refreshToken: string;
        expiresAt: number;
    }>;
    signUp(payload: AuthInput): Promise<string>;
    refreshToken(refreshToken: string): Promise<{
        accessToken: string;
        refreshToken: string;
        expiresAt: number;
    }>;
}
