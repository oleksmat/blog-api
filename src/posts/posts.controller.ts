import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put, Request, UnauthorizedException } from '@nestjs/common';
import { UserInfo } from 'src/auth/meta';
import { DtoPipe } from 'src/schemas/dto-pipe';
import { PostData } from 'src/schemas/posts';
import { checkPostMain, PostMain, validatePostMain } from 'src/schemas/posts/post-main';
import { UserData } from 'src/schemas/users';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(private postsService: PostsService) { }

  @Post('/')
  async addPost(
    @UserInfo() user: UserData,
    @Body(new DtoPipe(validatePostMain)) postdata: PostMain
  ): Promise<PostData> {
    const post = await this.postsService.addPost(user.id, postdata);
    return this.postsService.postToObject(post);
  }

  @Get('/')
  async getPosts(
    @UserInfo() user: UserData
  ): Promise<PostData[]> {
    const posts = await this.postsService.getPosts(user.id);
    return posts.map(post => this.postsService.postToObject(post));
  }

  @Get('/:id')
  async getPost(
    @UserInfo() user: UserData,
    @Param('id') id: string
  ): Promise<PostData> {
    const post = await this.postsService.getPost(id);
    if (!post) {
      throw new NotFoundException();
    } else if (post.creator_id.toHexString() === user.id) {
      return this.postsService.postToObject(post);
    } else {
      throw new UnauthorizedException();
    }
  }

  @Put('/:id')
  async updatePost(
    @UserInfo() user: UserData,
    @Param('id') id: string,
    @Body(new DtoPipe(checkPostMain)) postdata: PostMain
  ): Promise<PostData> {
    const post = await this.postsService.getPost(id);
    if (!post) {
      throw new NotFoundException();
    } else if (post.creator_id.toHexString() === user.id) {
      const post = await this.postsService.updatePost(id, postdata);
      return this.postsService.postToObject(post);
    } else {
      throw new UnauthorizedException();
    }
  }

  @Delete('/:id')
  async deletePost(
    @UserInfo() user: UserData,
    @Param('id') id: string
  ): Promise<void> {
    const post = await this.postsService.getPost(id);
    if (!post) {
      throw new NotFoundException();
    } else if (post.creator_id.toHexString() === user.id) {
      return await this.postsService.removePost(id);
    } else {
      throw new UnauthorizedException();
    }
  }
}
