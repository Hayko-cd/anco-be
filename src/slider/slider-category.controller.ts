// slider-category.controller.ts
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { SliderCategoryService } from './slider-category.service';
import { SliderCategory } from './slider-category.model';

@Controller('slider-category')
export class SliderCategoryController {
  constructor(private readonly sliderCategoryService: SliderCategoryService) {}

  @Get()
  async getAllData(): Promise<SliderCategory[]> {
    return this.sliderCategoryService.getAllData();
  }

  @Post()
  async addData(@Body() data: SliderCategory): Promise<SliderCategory> {
    try {
      return await this.sliderCategoryService.addData(data);
    } catch (error) {
      console.error('Error adding data:', error);
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
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
