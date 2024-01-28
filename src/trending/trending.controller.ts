// src/trending/trending.controller.ts

import { Controller, Get, Post, Body } from '@nestjs/common';
import { TrendingDto } from './trending.dto';
import { TrendingService } from './trending.service';
import { Trending } from './trending.model';

@Controller('trending')
export class TrendingController {
  constructor(private readonly trendingService: TrendingService) {}

  @Post()
  createTrending(@Body() trendingDto: TrendingDto): Promise<Trending> {
    return this.trendingService.create(trendingDto);
  }

  @Get()
  getAllTrending(): Promise<Trending[]> {
    return this.trendingService.findAll();
  }
}
