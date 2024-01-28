// slider-category.model.ts
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class SliderCategory extends Document {
  @Prop()
  title: string;

  @Prop()
  url: string;
}

export const sliderCategorySchema =
  SchemaFactory.createForClass(SliderCategory);
