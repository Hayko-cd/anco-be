import { FileInterceptor } from '@nestjs/platform-express';
import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  UseInterceptors,
  UploadedFile,
  Delete,
} from '@nestjs/common';
import { Multer } from 'multer';
import { ProductService } from './product.service';
import { Product } from './product.model';
import { multerConfig } from '../../multer.config';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @UseInterceptors(FileInterceptor('image', multerConfig))
  async createProduct(
    @Body() requestBody: any,
    @UploadedFile() file: Multer.File,
  ): Promise<Product> {
    const productData = {
      name: requestBody.name,
      description: requestBody.description,
      imageUrl: file ? file.filename : undefined,
      price: requestBody.price,
      categoryId: requestBody.categoryId,
      sizes: requestBody?.sizes,
      country_made_in: requestBody.country_made_in,
      inside_material: requestBody.inside_material,
      outside_material: requestBody.outside_material,
      brand: requestBody.brand,
    };

    return this.productService.create(productData);
  }

  @Get()
  getAllProducts(): Promise<Product[]> {
    return this.productService.findAll();
  }

  @Delete(':id')
  deleteCategory(@Param('id') id: string): Promise<void> {
    return this.productService.delete(id);
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
