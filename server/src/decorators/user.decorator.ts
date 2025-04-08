import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { UserDTO } from 'src/user/dto/user-dto.model';

export const UserFromToken = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    if (context.getType() === 'http') {
      return context.switchToHttp().getRequest().user as UserDTO;
    }

    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req.user as UserDTO;
  },
);
