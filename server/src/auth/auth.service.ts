import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { hash, verify } from 'argon2';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthInput } from './dto/auth.input';
import { UserDTO } from 'src/user/dto/user-dto.model';

@Injectable()
export class AuthService {
  constructor(
    private jwt: JwtService,
    private prisma: PrismaService,
    private config: ConfigService,
  ) {}

  async signUp(payload: AuthInput) {
    // this.prisma.user.create()
    const hashed = (await hash(payload.password)).toString();
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

  async signIn(payload: AuthInput) {
    const foundUser = await this.prisma.user.findUnique({
      where: { email: payload.email },
    });

    if (!foundUser) throw new ForbiddenException('Email is not registered');
    const isValidPassword = await verify(foundUser.hash, payload.password);
    if (!isValidPassword)
      throw new ForbiddenException('Password is incorrect!');

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { hash, ...rest } = foundUser;
    const tokens = await this.createToken(rest);
    return { ...tokens };
  }

  async refreshToken(refreshToken: string) {
    try {
      const payload: UserDTO = this.jwt.verify(refreshToken, {
        secret: this.config.get<string>('REFRESH_TOKEN_SECRET'),
      });

      const user = await this.prisma.user.findUnique({
        where: { email: payload.email },
      });

      if (!user) throw new UnauthorizedException('User Not Found');

      const tokens = await this.createToken(payload);
      return { ...tokens };
    } catch {
      throw new UnauthorizedException('Invalid Refresh token');
    }
  }

  async createToken(user: UserDTO) {
    const accessToken = await this.jwt.signAsync(user, {
      expiresIn: '1h',
      secret: this.config.get('ACCESS_TOKEN_SECRET'),
    });
    const refreshToken = await this.jwt.signAsync(user, {
      expiresIn: '1d',
      secret: this.config.get('REFRESH_TOKEN_SECRET'),
    });

    const expiresAt = Date.now() + 3600 * 1000; // (miliseconds) 1h = 3600sec

    return { accessToken, refreshToken, expiresAt };
  }

  async validateUser(email: string, password: string): Promise<UserDTO | null> {
    const foundUser = await this.prisma.user.findUnique({ where: { email } });
    if (!foundUser) return null;

    const isValidPassword = await verify(foundUser.hash, password);
    console.log({ isValidPassword, hash: foundUser.hash, password });
    if (!isValidPassword) return null;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { hash, ...result } = foundUser;
    return result;
  }
}
