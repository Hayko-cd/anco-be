// src/product/product.service.ts

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from './product.model';
import { ProductDto } from './product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name)
    private readonly productModel: Model<Product>,
  ) {}

  async create(productDto: ProductDto): Promise<Product> {
    const createdProduct = new this.productModel(productDto);
    return createdProduct.save();
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
