// slider-category.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SliderCategory } from './slider-category.model';

@Injectable()
export class SliderCategoryService {
  constructor(
    @InjectModel(SliderCategory.name)
    private readonly sliderCategoryModel: Model<SliderCategory>,
  ) {}

  async getAllData(): Promise<SliderCategory[]> {
    try {
      const data = await this.sliderCategoryModel.find().exec();
      return data || this.createDefaultSliderCategory();
    } catch (error) {
      console.error('Error getting data:', error);
      throw error;
    }
  }

  async addData(data: SliderCategory): Promise<SliderCategory> {
    try {
      const newData = new this.sliderCategoryModel(data);
      return newData.save();
    } catch (error) {
      console.error('Error adding data:', error.message);
      throw error;
    }
  }

  async editData(
    updatedData: Partial<SliderCategory>,
  ): Promise<SliderCategory | null> {
    try {
      const existingData = await this.sliderCategoryModel
        .findById(updatedData._id)
        .exec();

      if (existingData) {
        Object.assign(existingData, updatedData);
        return existingData.save();
      }

      return null;
    } catch (error) {
      console.error('Error editing data:', error);
      throw error;
    }
  }

  async deleteData(id: string): Promise<void> {
    try {
      await this.sliderCategoryModel.findByIdAndDelete(id).exec();
    } catch (error) {
      console.error('Error deleting data:', error);
      throw error;
    }
  }

  private createDefaultSliderCategory(): SliderCategory[] {
    return [
      new this.sliderCategoryModel({
        title: 'Default 1',
        url: 'https://example.com/1',
      }),
      new this.sliderCategoryModel({
        title: 'Default 2',
        url: 'https://example.com/2',
      }),
    ];
  }
}
