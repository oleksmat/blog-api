import { hasUserInfoData, validateUserInfo } from "./users";

export function hasTokenData(data: any): boolean {
  return hasUserInfoData(data)
  && ('id' in data) && (typeof data.id === 'string')
  && ('token_id' in data) && (typeof data.token_id === 'string');
}

export function isToken(data: any): data is Token {
  return hasTokenData(data);
}

export function validateToken(data: any): Token {
  if (isToken(data)) {
    return {
      ...validateUserInfo(data),
      id: data.id,
      token_id: data.token_id
    };
  } else {
    return null;
  }
}

export interface Token {

  id: string;
  
  username: string;
  
  password: string;

  first_name: string;

  last_name: string;

  token_id: string;
}
