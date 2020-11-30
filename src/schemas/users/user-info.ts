import { hasUserSignData, UserSign, validateUserSign } from "./user-sign";

export interface UserInfo extends UserSign {

  first_name: string;

  last_name: string;
}

export function hasUserInfoData(data: any): boolean {
  return hasUserSignData(data)
    && ('first_name' in data) && (typeof data.first_name === 'string')
    && ('last_name' in data) && (typeof data.last_name === 'string')
}

export function isUserInfo(data: any): data is UserInfo {
  return hasUserInfoData(data);
}

export function validateUserInfo(data: any): UserInfo {
  if (isUserInfo(data)) {
    const { first_name, last_name } = data;
    return { ...validateUserSign(data), first_name, last_name };
  } else {
    throw new TypeError();
  }
}