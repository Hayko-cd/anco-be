// slider-category.controller.ts
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseInterceptors,
  UploadedFile,
  HttpException,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
import { Multer } from 'multer';
import { multerConfig } from '../../multer.config';
import { BlogService } from './blog.service';
import { BlogModel } from './blog.model';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileUploadService } from '../file-upload.service';

@Controller('blogs')
export class BlogsController {
  constructor(
    private readonly BlogModels: BlogService,
    private readonly fileUploadService: FileUploadService,
  ) {}

  @Get()
  async getAllData(): Promise<BlogModel[]> {
    return this.BlogModels.getAllData();
  }

  @Get(':id')
  async getBlogById(@Param('id') id: string): Promise<BlogModel> {
    try {
      const blog = await this.BlogModels.getBlogById(id);

      if (!blog) {
        throw new NotFoundException(`Blog with id ${id} not found`);
      }

      return blog;
    } catch (error) {
      console.error('Error getting blog by ID:', error);
      throw error;
    }
  }

  @Post()
  @UseInterceptors(FileInterceptor('image', multerConfig))
  async addData(
    @Body() requestBody: any,
    @UploadedFile() file: Multer.File,
  ): Promise<BlogModel> {
    const uploadResult = await this.fileUploadService.uploadFile(file);
    const imageUrl = uploadResult.Key;

    const productData = {
      title: requestBody.title,
      description: requestBody.description,
      imageUrl: imageUrl,
    };

    return this.BlogModels.addData(productData);
  }

  @Put(':id')
  async editData(
    @Param('id') id: string,
    @Body() data: Partial<BlogModel>,
  ): Promise<BlogModel | null> {
    try {
      data._id = id;
      return await this.BlogModels.editData(data);
    } catch (error) {
      console.error('Error editing data:', error);
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Delete(':id')
  async deleteData(@Param('id') id: string): Promise<void> {
    try {
      await this.BlogModels.deleteData(id);
    } catch (error) {
      console.error('Error deleting data:', error);
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
