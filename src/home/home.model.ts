// home.model.ts
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Home extends Document {
  @Prop()
  title: string;

  @Prop()
  description: string;
}

export const homeSchema = SchemaFactory.createForClass(Home);
