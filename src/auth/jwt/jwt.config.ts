import { JwtModuleOptions } from "@nestjs/jwt";

export const JWT_CONFIG: JwtModuleOptions = {
  secret: 'SECRET_KEY',
  signOptions: { expiresIn: '60s' }
};
export const IGNORE_EXPIRATION = true;
