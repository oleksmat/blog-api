import { hasUserInfoData } from "./user-info";

export interface UserData {

  id: string;
  
  username: string;
  
  password: string;

  first_name: string;

  last_name: string;
}

export function hasUserData(data: any): boolean {
  return hasUserInfoData(data)
  && ('id' in data) && (typeof data.id === 'string');
}

export function isUserData(data: any): data is UserData {
  return hasUserData(data);
}
