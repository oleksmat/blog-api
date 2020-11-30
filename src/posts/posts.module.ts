import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Post, PostSchema } from 'src/schemas/posts';
import { PostsController } from './posts.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{
      name: Post.name,
      schema: PostSchema
    }])
  ],
  providers: [PostsService],
  exports: [PostsService],
  controllers: [PostsController]
})
export class PostsModule {}
