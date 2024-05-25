import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Home } from './home.model';

@Injectable()
export class HomeService {
  constructor(
    @InjectModel(Home.name) private readonly homeModel: Model<Home>,
  ) {}

  async getAllData(): Promise<Home[]> {
    try {
      return await this.homeModel.find().exec();
    } catch (error) {
      console.error('Error getting data:', error);
      throw error;
    }
  }

  async addData(data: Home): Promise<Home> {
    try {
      // Delete all existing data
      await this.homeModel.deleteMany({});

      // Add new data
      const newData = new this.homeModel(data);
      return newData.save();
    } catch (error) {
      console.error('Error adding data:', error.message);
      throw error;
    }
  }
}
