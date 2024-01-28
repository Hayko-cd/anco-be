import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Contact extends Document {
  @Prop()
  first_name: string;

  @Prop()
  last_name: string;

  @Prop()
  email_address: string;

  @Prop()
  phone_number: number;

  @Prop()
  message: string;
}

export const ContactSchema = SchemaFactory.createForClass(Contact);
