// slider-category.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SliderCategory, sliderCategorySchema } from './slider-category.model';
import { SliderCategoryController } from './slider-category.controller';
import { SliderCategoryService } from './slider-category.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: SliderCategory.name, schema: sliderCategorySchema },
    ]),
  ],
  controllers: [SliderCategoryController],
  providers: [SliderCategoryService],
})
export class SliderCategoryModule {}
