// src/category/category.service.ts

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Category } from './category.model';
import { CategoryDto } from './category.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name)
    private readonly categoryModel: Model<Category>,
  ) {}

  async create(categoryDto: CategoryDto): Promise<Category> {
    const createdCategory = new this.categoryModel(categoryDto);
    return createdCategory.save();
  }

  async findAll(): Promise<Category[]> {
    return this.categoryModel.find().exec();
  }

  async findById(id: string): Promise<Category> {
    return this.categoryModel.findById(id).exec();
  }

  async delete(id: string): Promise<void> {
    await this.categoryModel.findByIdAndDelete(id).exec();
  }
}
