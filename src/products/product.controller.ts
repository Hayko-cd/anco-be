// src/product/product.controller.ts

import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { ProductDto } from './product.dto';
import { ProductService } from './product.service';
import { Product } from './product.model';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  createProduct(@Body() productDto: ProductDto): Promise<Product> {
    return this.productService.create(productDto);
  }

  @Get()
  getAllProducts(): Promise<Product[]> {
    return this.productService.findAll();
  }

  @Get(':id')
  getProductById(@Param('id') id: string): Promise<Product> {
    return this.productService.findById(id);
  }

  @Get('category/:categoryId')
  getProductsByCategory(
    @Param('categoryId') categoryId: string,
  ): Promise<Product[]> {
    return this.productService.findByCategory(categoryId);
  }
}
