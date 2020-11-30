import { JwtModuleOptions } from "@nestjs/jwt";

export const JWT_CONFIG: JwtModuleOptions = {
  secret: process.env['JWT_SECRET'],
  signOptions: { expiresIn: '60s' }
};
export const IGNORE_EXPIRATION = true;
