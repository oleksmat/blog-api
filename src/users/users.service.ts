import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ObjectId } from 'mongodb';
import { Model } from 'mongoose';
import { User, UserDocument, UserInfo, UserSign } from 'src/schemas/users';
import { compare, hash } from 'bcrypt';

@Injectable()
export class UsersService {

  constructor(
    @InjectModel(User.name)
    public userModel: Model<UserDocument>
  ) { }

  async registerUserAndGetToken(userInfo: UserInfo): Promise<UserDocument> {
    const preUser = new this.userModel({
      ...userInfo,
      password: await hash(userInfo.password, 10),
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
    const user = await this.userModel.findOne({ username: userSign.username });
    if (!user) {
      return null;
    } else if (!await compare(userSign.password, user.password)) {
      return null;
    }
    return this.userModel.findOneAndUpdate({ _id: user._id }, {
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
}
