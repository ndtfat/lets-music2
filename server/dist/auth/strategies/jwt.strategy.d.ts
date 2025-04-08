import { ConfigService } from '@nestjs/config';
import { Strategy } from 'passport-jwt';
import { UserDTO } from 'src/user/dto/user-dto.model';
import { AuthService } from '../auth.service';
declare const JwtStrategy_base: new (...args: [opt: import("passport-jwt").StrategyOptionsWithoutRequest] | [opt: import("passport-jwt").StrategyOptionsWithRequest]) => Strategy & {
    validate(...args: any[]): unknown;
};
export declare class JwtStrategy extends JwtStrategy_base {
    private authService;
    constructor(authService: AuthService, configService: ConfigService);
    validate(data: UserDTO): UserDTO;
}
export {};
