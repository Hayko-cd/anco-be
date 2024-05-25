import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type HomeDocument = HydratedDocument<Home>;

@Schema()
export class Home {
  @Prop()
  title: string;

  @Prop()
  description: string;
}

export const HomeSchema = SchemaFactory.createForClass(Home);
