// init.model.ts
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Init extends Document {
  @Prop()
  phone_number_1: string;

  @Prop()
  phone_number_2: string;
  @Prop()
  location_office: string;
  @Prop()
  gmail: string;
  @Prop()
  facebook_link: string;
  @Prop()
  tiktok_link: string;

  @Prop()
  linkedin_link: string;

  @Prop()
  instagram_link: string;
}

export const InitSchema = SchemaFactory.createForClass(Init);
