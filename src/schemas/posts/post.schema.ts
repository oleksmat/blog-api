import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ObjectId } from 'mongodb';
import { Document } from 'mongoose';
import { PostMain } from './post-main';

export type PostDocument = Post & Document;

@Schema()
export class Post implements PostMain {
  @Prop({required: true})
  title: string;

  @Prop({required: true})
  content: string;

  @Prop({
    required: true,
    type: ObjectId
  })
  creator_id: ObjectId;
}

export const PostSchema = SchemaFactory.createForClass(Post);
