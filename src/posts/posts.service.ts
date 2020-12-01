import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ObjectId } from 'mongodb';
import { Model } from 'mongoose';
import { Post, PostDocument, PostMain } from 'src/schemas/posts';

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(Post.name)
    public postModel: Model<PostDocument>
  ) { }

  async addPost(userId: string, postData: PostMain): Promise<PostDocument> {
    const post = new this.postModel({
      ...postData,
      creator_id: new ObjectId(userId)
    });
    return await post.save();
  }

  async getPost(postId: string): Promise<PostDocument> {
    return this.postModel.findById(new ObjectId(postId));
  }

  async getPosts(userId: string): Promise<PostDocument[]> {
    return this.postModel.find({ creator_id: new ObjectId(userId) });
  }

  async updatePost(postId: string, postData: PostMain): Promise<PostDocument> {
    return this.postModel.findByIdAndUpdate(
      new ObjectId(postId),
      {$set: postData},
      {new: true}
    );
  }

  async removePost(postId: string): Promise<void> {
    await this.postModel.findByIdAndRemove(new ObjectId(postId));
  }
}
