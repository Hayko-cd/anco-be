import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from './product.model';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name)
    private readonly productModel: Model<Product>,
  ) {}

  async create(productData: any): Promise<Product> {
    const createdProduct = new this.productModel(productData);
    return createdProduct.save();
  }

  async delete(id: string): Promise<void> {
    await this.productModel.findByIdAndDelete(id).exec();
  }

  async findAll(): Promise<Product[]> {
    return this.productModel.find().exec();
  }

  async findById(id: string): Promise<Product> {
    return this.productModel.findById(id).exec();
  }

  async findByCategory(categoryId: string): Promise<Product[]> {
    return this.productModel.find({ categoryId }).exec();
  }
}
