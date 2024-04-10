// slider-category.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BlogModel, blogModelSchema } from './blog.model';
import { BlogsController } from './blog.controller';
import { BlogService } from './blog.service';
import { FileUploadService } from '../file-upload.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: BlogModel.name, schema: blogModelSchema },
    ]),
  ],
  controllers: [BlogsController],
  providers: [BlogService, FileUploadService],
})
export class BlogsModule {}
