// src/trending/trending.module.ts

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TrendingController } from './trending.controller';
import { TrendingService } from './trending.service';
import { Trending, TrendingSchema } from './trending.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Trending.name, schema: TrendingSchema },
    ]),
  ],
  controllers: [TrendingController],
  providers: [TrendingService],
})
export class TrendingModule {}
