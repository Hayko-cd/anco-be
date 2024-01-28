// src/product/product.model.ts

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Category } from '../category/category.model'; // Import the Category model

@Schema()
export class Product extends Document {
  @Prop()
  name: string;

  @Prop()
  description: string;

  @Prop()
  price: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Category' })
  categoryId: Category['_id'];
}

export const ProductSchema = SchemaFactory.createForClass(Product);
