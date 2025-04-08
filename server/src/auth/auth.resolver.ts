import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { AuthInput } from './dto/auth.input';
import { SignInResponse } from './dto/sign-in-response.model';
import { UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from './guards/local.guard';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => SignInResponse)
  @UseGuards(LocalAuthGuard)
  signIn(@Args('payload') payload: AuthInput) {
    return this.authService.signIn(payload);
  }

  @Mutation(() => String)
  signUp(@Args('payload') payload: AuthInput) {
    return this.authService.signUp(payload);
  }

  @Mutation(() => SignInResponse)
  refreshToken(@Args('refreshToken') refreshToken: string) {
    return this.authService.refreshToken(refreshToken);
  }
}
