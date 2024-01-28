// init.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Init } from './init.model';

@Injectable()
export class InitService {
  constructor(
    @InjectModel(Init.name) private readonly initModel: Model<Init>,
  ) {}

  async getAllData(): Promise<Init> {
    try {
      const data = await this.initModel.findOne().exec();
      return data || this.createDefaultInit();
    } catch (error) {
      console.error('Error getting data:', error);
      throw error;
    }
  }

  async addData(data: Init): Promise<Init> {
    try {
      console.log('vaspiurrrr');
      const newData = new this.initModel(data);
      return newData.save();
    } catch (error) {
      console.error('Error adding data:', error.message);
      throw error;
    }
  }

  async editData(updatedData: Partial<Init>): Promise<Init | null> {
    try {
      const existingData = await this.initModel.findOne().exec();

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

  private createDefaultInit(): Init {
    return new this.initModel({
      phone_number_1: '',
      phone_number_2: '',
      location_office: '',
      gmail: '',
      facebook_link: '',
      tiktok_link: '',
      linkedin_link: '',
      instagram_link: '',
    });
  }
}
