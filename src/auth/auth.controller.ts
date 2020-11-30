import { Body, Controller, Post, Request } from '@nestjs/common';
import { DtoPipe } from 'src/schemas/dto-pipe';
import { Token } from 'src/schemas/token';
import { UserData, UserInfo, UserSign, validateUserInfo, validateUserSign } from 'src/schemas/users';
import { AuthService } from './auth.service';
import { TokenData } from './meta/authinfo.meta';
import { Public } from './meta/public.meta';

@Controller('auth')
export class AuthController {

  constructor(
    private authService: AuthService
  ) { }

  @Public()
  @Post('/signup')
  async signUp(
    @Body(new DtoPipe(validateUserInfo)) body: UserInfo
  ): Promise<string> {
    return await this.authService.signUp(body);
  }

  @Public()
  @Post('/signin')
  async signIn(
    @Body(new DtoPipe(validateUserSign)) body: UserSign
  ): Promise<string> {
    return this.authService.signIn(body);
  }

  @Post('/signout')
  async signOut(@TokenData() tokenData: Token<UserData>): Promise<void> {
    return this.authService.revokeToken(tokenData);
  }
}
