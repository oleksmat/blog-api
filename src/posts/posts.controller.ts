import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put, Request, UnauthorizedException } from '@nestjs/common';
import { TokenData } from 'src/auth/meta';
import { DtoPipe } from 'src/utils/dto-pipe';
import { PostDocument } from 'src/schemas/posts';
import { checkPostMain, PostMain, validatePostMain } from 'src/schemas/posts/post-main';
import { Token } from 'src/schemas/token';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(private postsService: PostsService) { }

  @Post('/')
  async addPost(
    @TokenData() token: Token,
    @Body(new DtoPipe(validatePostMain)) postdata: PostMain
  ): Promise<PostDocument> {
    const post = await this.postsService.addPost(token.id, postdata);
    return post;
  }

  @Get('/')
  async getPosts(
    @TokenData() token: Token
  ): Promise<PostDocument[]> {
    const posts = await this.postsService.getPosts(token.id);
    return posts;
  }

  @Get('/:id')
  async getPost(
    @TokenData() token: Token,
    @Param('id') id: string
  ): Promise<PostDocument> {
    const post = await this.postsService.getPost(id);
    if (!post) {
      throw new NotFoundException();
    } else if (post.creator_id.toHexString() === token.id) {
      return post;
    } else {
      throw new UnauthorizedException();
    }
  }

  @Put('/:id')
  async updatePost(
    @TokenData() token: Token,
    @Param('id') id: string,
    @Body(new DtoPipe(checkPostMain)) postdata: PostMain
  ): Promise<PostDocument> {
    const post = await this.postsService.getPost(id);
    if (!post) {
      throw new NotFoundException();
    } else if (post.creator_id.toHexString() === token.id) {
      const post = await this.postsService.updatePost(id, postdata);
      return post;
    } else {
      throw new UnauthorizedException();
    }
  }

  @Delete('/:id')
  async deletePost(
    @TokenData() token: Token,
    @Param('id') id: string
  ): Promise<void> {
    const post = await this.postsService.getPost(id);
    if (!post) {
      throw new NotFoundException();
    } else if (post.creator_id.toHexString() === token.id) {
      return await this.postsService.removePost(id);
    } else {
      throw new UnauthorizedException();
    }
  }
}
