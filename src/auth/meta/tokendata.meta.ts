import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Token } from 'src/schemas/token';

export const TokenData = createParamDecorator<Token>(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user as Token;
  },
);
