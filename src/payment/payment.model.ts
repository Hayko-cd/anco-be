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
        sizes: [String],
        selectedColor: String,
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

  @Prop({ required: false })
  country: string;

  @Prop({ required: false })
  city: string;

  @Prop({ required: false })
  postal_code: string;

  @Prop({ required: false })
  country_delivery: string;

  @Prop({ required: false })
  city_delivery: string;

  @Prop({ required: false })
  home_delivery: string;

  @Prop({ required: false })
  street_delivery: string;

  @Prop({ required: false })
  comment_field: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  email: string;
}

export const PaymentSchema = SchemaFactory.createForClass(Payment);
