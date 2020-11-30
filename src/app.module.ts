import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { PostsModule } from './posts/posts.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      process.env['DATABASE_URI'],
      { useFindAndModify: false }
    ),
    AuthModule,
    PostsModule
  ]
})
export class AppModule {}
