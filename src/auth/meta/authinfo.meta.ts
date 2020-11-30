import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Token } from 'src/schemas/token';
import { UserData } from 'src/schemas/users';

export const TokenData = createParamDecorator<Token<UserData>>(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user as Token<UserData>;
  },
);
