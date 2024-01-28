// about-us.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AboutUs } from './about-us.model';

@Injectable()
export class AboutUsService {
  constructor(
    @InjectModel(AboutUs.name) private readonly aboutUsModel: Model<AboutUs>,
  ) {}

  async getDescription(): Promise<AboutUs> {
    try {
      const data = await this.aboutUsModel.findOne().exec();
      return data || this.createDefaultAboutUs();
    } catch (error) {
      console.error('Error getting data:', error);
      throw error;
    }
  }

  async updateDescription(description: string): Promise<AboutUs> {
    try {
      const existingData = await this.aboutUsModel.findOne().exec();

      if (existingData) {
        existingData.description = description;
        return existingData.save();
      }

      const newData = new this.aboutUsModel({ description });
      return newData.save();
    } catch (error) {
      console.error('Error updating description:', error);
      throw error;
    }
  }

  private createDefaultAboutUs(): AboutUs {
    return new this.aboutUsModel({
      description: '',
    });
  }
}
