// src/trending/trending.model.ts

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Trending extends Document {
  @Prop()
  image: string;

  @Prop()
  price: string;
}

export const TrendingSchema = SchemaFactory.createForClass(Trending);
