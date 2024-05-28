// payment.model.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PaymentDocument = Payment & Document;

@Schema()
export class Payment {
  @Prop({ required: true })
  orderId: string;

  @Prop({
    type: [
      {
        _id: String,
        name: String,
        description: String,
        brand: String,
        categoryId: String,
        country_made_in: String,
        imageUrls: [String],
        inside_material: String,
        outside_material: String,
        price: String,
        quantity: Number,
        sizes: [String],
        country: String,
        city: String,
        postal_code: String,
        country_delivery: String,
        city_delivery: String,
        home_delivery: String,
        comment_field: String,
        street_delivery: String,
        __v: Number,
      },
    ],
    required: true,
  })
  description: Record<string, any>[];

  @Prop({ required: true })
  phone_number: string;

  @Prop({ required: true })
  price: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  email: string;
}

export const PaymentSchema = SchemaFactory.createForClass(Payment);
