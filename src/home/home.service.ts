// home.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Home } from './home.model';

@Injectable()
export class HomeService {
  constructor(
    @InjectModel(Home.name) private readonly homeModel: Model<Home>,
  ) {}

  async getAllData(): Promise<Home> {
    try {
      const data = await this.homeModel.findOne().exec();
      return data || this.createDefaultHome();
    } catch (error) {
      console.error('Error getting data:', error);
      throw error;
    }
  }

  async addData(data: Home): Promise<Home> {
    try {
      const newData = new this.homeModel(data);
      return newData.save();
    } catch (error) {
      console.error('Error adding data:', error.message);
      throw error;
    }
  }

  async editData(updatedData: Partial<Home>): Promise<Home | null> {
    try {
      const existingData = await this.homeModel.findOne().exec();

      if (existingData) {
        Object.keys(updatedData).forEach((key) => {
          if (updatedData[key] === '') {
            existingData[key] = null;
          } else {
            existingData[key] = updatedData[key];
          }
        });

        return existingData.save();
      }

      return null;
    } catch (error) {
      console.error('Error editing data:', error);
      throw error;
    }
  }

  private createDefaultHome(): Home {
    return new this.homeModel({
      title: '',
      description: '',
    });
  }
}
