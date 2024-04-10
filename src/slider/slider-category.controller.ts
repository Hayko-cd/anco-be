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
} from '@nestjs/common';
import { Multer } from 'multer';
import { multerConfig } from '../../multer.config';
import { SliderCategoryService } from './slider-category.service';
import { SliderCategory } from './slider-category.model';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileUploadService } from '../file-upload.service';

@Controller('slider-category')
export class SliderCategoryController {
  constructor(
    private readonly sliderCategoryService: SliderCategoryService,
    private readonly fileUploadService: FileUploadService,
  ) {}

  @Get()
  async getAllData(): Promise<SliderCategory[]> {
    return this.sliderCategoryService.getAllData();
  }

  @Post()
  @UseInterceptors(FileInterceptor('image', multerConfig))
  async addData(
    @Body() requestBody: any,
    @UploadedFile() file: Multer.File,
  ): Promise<SliderCategory> {
    const uploadResult = await this.fileUploadService.uploadFile(file);
    const imageUrl = uploadResult.Key;

    const productData = {
      title: requestBody.title,
      imageUrl: imageUrl,
    };

    return this.sliderCategoryService.addData(productData);
  }

  @Put(':id')
  async editData(
    @Param('id') id: string,
    @Body() data: Partial<SliderCategory>,
  ): Promise<SliderCategory | null> {
    try {
      data._id = id; // Add the id to the data for updating
      return await this.sliderCategoryService.editData(data);
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
      await this.sliderCategoryService.deleteData(id);
    } catch (error) {
      console.error('Error deleting data:', error);
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
