export interface PostData {

  id: string;
  
  title: string;
  
  content: string;

  creator_id: string;
}

export function hasPostData(data: any): boolean {
  return ('id' in data) && (typeof data.id === 'string')
  && ('title' in data) && (typeof data.title === 'string')
  && ('content' in data) && (typeof data.content === 'string')
  && ('creator_id' in data) && (typeof data.creator_id === 'string');
}

export function isPostData(data: any): data is PostData {
  return hasPostData(data);
}
