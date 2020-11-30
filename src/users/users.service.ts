import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ObjectId } from 'mongodb';
import { Model } from 'mongoose';
import { User, UserData, UserDocument, UserInfo, UserSign, validateUserInfo, validateUserSign } from 'src/schemas/users';

@Injectable()
export class UsersService {

  constructor(
    @InjectModel(User.name)
    public userModel: Model<UserDocument>
  ) { }

  async registerUserAndGetToken(userInfo: UserInfo): Promise<UserDocument> {
    const preUser = new this.userModel({
      ...validateUserInfo(userInfo),
      tokens: [new ObjectId().toHexString()]
    });
    const user = await this.userModel.findOneAndUpdate( 
      { username: userInfo.username },
      { $setOnInsert: preUser },
      { upsert: true, new: true }
    );
    if (user.tokens.length == 1 && user.tokens[0] === preUser.tokens[0]) {
      return preUser;
    } else {
      return null;
    }
  }

  async validateUserAndGetToken(userSign: UserSign): Promise<UserDocument> {
    const tokenId = new ObjectId().toHexString();
    return this.userModel.findOneAndUpdate(validateUserSign(userSign), {
      $push: { tokens: tokenId }
    }, {new: true});
  }

  async validateToken(userId: string, tokenId: string): Promise<boolean> {
    return (await this.userModel.findOne({
      _id: new ObjectId(userId),
      tokens: tokenId
    })) !== null;
  }

  async invalidateToken(userId: string, tokenId: string): Promise<void> {
    await this.userModel.findOneAndUpdate({ _id: new ObjectId(userId)}, {
      $pull: { tokens: tokenId }
    });
  }

  userToObject(userDoc: UserDocument): UserData {
    return {
      id: userDoc.id,
      username: userDoc.username,
      password: userDoc.password,
      first_name: userDoc.first_name,
      last_name: userDoc.last_name
    }
  }

  objectToUser(userData: UserData): UserDocument {
    return new this.userModel({
      username: userData.username,
      password: userData.password,
      first_name: userData.first_name,
      last_name: userData.last_name,
      _id: new ObjectId(userData.id)
    });
  }
}
