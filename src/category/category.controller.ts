// src/category/category.controller.ts

import { Controller, Get, Post, Param, Body } from '@nestjs/common';
// @ts-ignore
import { CategoryDto } from './category.dto';
import { CategoryService } from './category.service';
import { Category } from './category.model';

@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  createCategory(@Body() categoryDto: CategoryDto): Promise<Category> {
    return this.categoryService.create(categoryDto);
  }

  @Get()
  getAllCategories(): Promise<Category[]> {
    return this.categoryService.findAll();
  }

  @Get(':id')
  getCategoryById(@Param('id') id: string): Promise<Category> {
    return this.categoryService.findById(id);
  }
}
