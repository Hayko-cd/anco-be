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
import { FileUploadService } from '../file-upload.service';

@Controller('products')
export class ProductController {
  constructor(
    private readonly productService: ProductService,
    private readonly fileUploadService: FileUploadService,
  ) {}

  @Post()
  @UseInterceptors(FileInterceptor('image', multerConfig))
  @UseInterceptors(FileInterceptor('image_2', multerConfig))
  @UseInterceptors(FileInterceptor('image_3', multerConfig))
  @UseInterceptors(FileInterceptor('image_4', multerConfig))
  @UseInterceptors(FileInterceptor('image_5', multerConfig))
  async createProduct(
    @Body() requestBody: any,
    @UploadedFile() file: Multer.File,
    @UploadedFile() file_2: Multer.File,
    @UploadedFile() file_3: Multer.File,
    @UploadedFile() file_4: Multer.File,
    @UploadedFile() file_5: Multer.File,
  ): Promise<Product> {
    const uploadResult = await this.fileUploadService.uploadFile(file);
    const uploadResult2 = await this.fileUploadService.uploadFile(file_2);
    const uploadResult3 = await this.fileUploadService.uploadFile(file_3);
    const uploadResult4 = await this.fileUploadService.uploadFile(file_4);
    const uploadResult5 = await this.fileUploadService.uploadFile(file_5);
    const imageUrl = uploadResult.Key;
    const imageUrl2 = uploadResult2.Key;
    const imageUrl3 = uploadResult3.Key;
    const imageUrl4 = uploadResult4.Key;
    const imageUrl5 = uploadResult5.Key;

    const productData = {
      name: requestBody.name,
      description: requestBody.description,
      imageUrl: imageUrl,
      imageUrl2: imageUrl2,
      imageUrl3: imageUrl3,
      imageUrl4: imageUrl4,
      imageUrl5: imageUrl5,
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
