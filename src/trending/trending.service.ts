// src/trending/trending.service.ts

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Trending } from './trending.model';
import { TrendingDto } from './trending.dto';

@Injectable()
export class TrendingService {
  constructor(
    @InjectModel(Trending.name)
    private readonly trendingModel: Model<Trending>,
  ) {}

  async create(trendingDto: TrendingDto): Promise<Trending> {
    const createdTrending = new this.trendingModel(trendingDto);
    return createdTrending.save();
  }

  async findAll(): Promise<Trending[]> {
    return this.trendingModel.find().exec();
  }
}
