import {
  Controller,
  Get,
  Post,
  Body,
  HttpException,
  HttpStatus,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { Multer } from 'multer';
import { FileInterceptor } from '@nestjs/platform-express';
import { AboutUsService } from './about-us.service';
import { AboutUs } from './about-us.model';
import { multerConfig } from '../../multer.config';

@Controller('about-us')
export class AboutUsController {
  constructor(private readonly aboutUsService: AboutUsService) {}

  @Get()
  async getDescription(): Promise<AboutUs> {
    return this.aboutUsService.getDescription();
  }

  @Post()
  @UseInterceptors(FileInterceptor('image', multerConfig))
  async updateDescription(
    @Body('description') description: string,
    @UploadedFile() file: Multer.File,
  ): Promise<AboutUs> {
    try {
      return await this.aboutUsService.updateDescription(description, file);
    } catch (error) {
      console.error('Error updating description:', error);
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('upload-image')
  @UseInterceptors(FileInterceptor('image', multerConfig))
  async uploadImage(@UploadedFile() file) {
    try {
      console.log('File:', file);
      console.log('File path:', `/uploads/${file.filename}`);
      return { message: 'File uploaded successfully' };
    } catch (error) {
      console.error('Error uploading file:', error);
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
