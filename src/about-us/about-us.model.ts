// about-us.model.ts
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class AboutUs extends Document {
  @Prop()
  description: string;

  @Prop()
  imageUrl: string;
}

export const aboutUsSchema = SchemaFactory.createForClass(AboutUs);
