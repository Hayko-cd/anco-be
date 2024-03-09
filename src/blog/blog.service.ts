import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BlogModel } from './blog.model';

@Injectable()
export class BlogService {
  constructor(
    @InjectModel(BlogModel.name)
    private readonly BlogModels: Model<BlogModel>,
  ) {}

  async getAllData(): Promise<BlogModel[]> {
    try {
      const data = await this.BlogModels.find().exec();
      return data || this.createDefaultBlog();
    } catch (error) {
      console.error('Error getting data:', error);
      throw error;
    }
  }

  async getBlogById(id: string): Promise<BlogModel> {
    try {
      const blog = await this.BlogModels.findById(id).exec();

      if (!blog) {
        console.error('Error getting data:');
      }

      return blog;
    } catch (error) {
      console.error('Error getting blog by ID:', error);
      throw error;
    }
  }

  async addData(data: { imageUrl: any; title: any }): Promise<BlogModel> {
    try {
      const newData = new this.BlogModels(data);
      return newData.save();
    } catch (error) {
      console.error('Error adding data:', error.message);
      throw error;
    }
  }

  async editData(updatedData: Partial<BlogModel>): Promise<BlogModel | null> {
    try {
      const existingData = await this.BlogModels.findById(
        updatedData._id,
      ).exec();

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
      await this.BlogModels.findByIdAndDelete(id).exec();
    } catch (error) {
      console.error('Error deleting data:', error);
      throw error;
    }
  }

  private createDefaultBlog(): BlogModel[] {
    return [];
  }
}
