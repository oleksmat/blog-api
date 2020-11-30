import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
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

export const UserSchema = SchemaFactory.createForClass(User);
