import { openStdin } from "process";

export interface PostMain {

  title?: string;

  content?: string;
}

export function isPostMain(data: any): data is PostMain {
  return ('title' in data) && (typeof data.title === 'string')
  && ('content' in data) && (typeof data.content === 'string');
}

export function validatePostMain(data: any): PostMain {
  if (isPostMain(data)) {
    const { title, content } = data;
    return { title, content };
  } else {
    throw new TypeError();
  }
}

export function checkPostMain(data: any): PostMain {
  let post: { title?: string, content?: string} = {};
  let empty = true;

  if (('title' in data) && (typeof data.title === 'string')) {
    post.title = data.title;
    empty = false;
  }
  if (('content' in data) && (typeof data.content === 'string')) {
    post.content = data.content;
    empty = false;
  }
  if (empty) {
    throw new TypeError();
  }
  return post;
}
