export type Token<T> = { data: T, token_id: string };

export function isToken<T>(
  data: any,
  tGuard: (value: any) => value is T
): data is Token<T> {
  return isAnyToken(data) && tGuard(data.data);
}

export function isAnyToken(
  data: any
): data is Token<any> {
  return ('token_id' in data && typeof data.token_id === 'string')
    && ('data' in data);
}
