export interface UserSign {
  
  username: string;
  
  password: string;
}

export function hasUserSignData(data: any): boolean {
  return ('username' in data) && (typeof data.username === 'string')
    && ('password' in data) && (typeof data.password === 'string');
}

export function isUserSign(data: any): data is UserSign {
  return hasUserSignData(data);
}

export function validateUserSign(data: any): UserSign {
  if (isUserSign(data)) {
    const { username, password } = data;
    return { username, password };
  } else {
    throw new TypeError();
  }
}
