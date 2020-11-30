import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import { Token } from 'src/schemas/token';
import { UserData } from 'src/schemas/users';

export const UserInfo = createParamDecorator<UserData>(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<Request>();
    return (request.user as Token<UserData>).data as UserData;
  },
);
