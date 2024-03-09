// slider-category.model.ts
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class BlogModel extends Document {
  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop()
  imageUrl: string;
}

export const blogModelSchema = SchemaFactory.createForClass(BlogModel);
