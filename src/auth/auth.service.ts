import { Injectable } from '@nestjs/common';
import { ForbiddenException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Token } from 'src/schemas/token';
import { UserData, UserDocument, UserInfo, UserSign } from 'src/schemas/users';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {

  constructor(
    private users: UsersService,
    private jwtService: JwtService
  ) { }

  async signUp(userInfo: UserInfo): Promise<string> {
    const user = await this.users.registerUserAndGetToken(userInfo);

    if (!user) {
      throw new ForbiddenException();
    }

    const token = await this.createToken(user);
    return this.tokenize(token);
  }

  private async tokenize(token: Token<UserData>): Promise<string> {
    return this.jwtService.sign(token);
  }

  async signIn(userSign: UserSign): Promise<string> {
    let user = await this.users.validateUserAndGetToken(userSign);

    if (!user) {
      throw new ForbiddenException();
    }

    const token = await this.createToken(user);
    return this.tokenize(token);
  }

  async createToken(user: UserDocument): Promise<Token<UserData>> {
    return {
      token_id: user.tokens[user.tokens.length - 1],
      data: this.users.userToObject(user)
    }
  }

  async checkToken(token: Token<UserData>): Promise<boolean> {
    return this.users.validateToken(token.data.id, token.token_id);
  }

  async revokeToken(token: Token<UserData>): Promise<void> {
    return this.users.invalidateToken(token.data.id, token.token_id);
  }

}
