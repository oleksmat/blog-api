import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ObjectId } from 'mongodb';
import { Document } from 'mongoose';
import { UserInfo } from './user-info';

export type UserDocument = User & Document;

@Schema()
export class User implements UserInfo {
  @Prop({ required: true })
  username: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  first_name: string;

  @Prop({ required: true })
  last_name: string;

  @Prop({ required: true, type: [String] })
  tokens: [string];
}

export const UserSchema = SchemaFactory.createForClass(User)
  .set('toJSON', {
    transform(doc: UserDocument) {
      return {
        id: (doc._id as ObjectId).toHexString(),
        username: doc.username,
        password: doc.password,
        first_name: doc.first_name,
        last_name: doc.last_name
      };
    }
  });
