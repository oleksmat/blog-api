import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { IGNORE_EXPIRATION, JWT_CONFIG } from './jwt.config';
import { isUserData, UserData } from 'src/schemas/users';
import { isToken, Token } from 'src/schemas/token';
import { AuthService } from '../auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private authService: AuthService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: IGNORE_EXPIRATION,
      secretOrKey: JWT_CONFIG.secret
    });
  }

  async validate(payload: any): Promise<Token<UserData>> {
    if (!isToken(payload, isUserData)) {
      throw new Error('should not happen');
    }

    if (!this.authService.checkToken(payload)) {
      throw new ForbiddenException();
    }

    return payload;
  }
}
