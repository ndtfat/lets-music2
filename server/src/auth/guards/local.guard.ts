import { ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

interface GqlContext {
  req: Request;
}

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    const gqlReq = ctx.getContext<GqlContext>().req;
    const { email, password }: { email: string; password: string } =
      ctx.getArgs<{
        payload: { email: string; password: string };
      }>().payload;

    if (!gqlReq.body) {
      gqlReq.body = {};
    }
    gqlReq.body.email = email;
    gqlReq.body.password = password;

    return gqlReq;
  }
}
