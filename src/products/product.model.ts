import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Category } from '../category/category.model';

@Schema()
export class Product extends Document {
  @Prop()
  name: string;

  @Prop()
  description: string;

  @Prop()
  imageUrl: string;

  @Prop()
  imageUrl2: string;

  @Prop()
  imageUrl3: string;

  @Prop()
  imageUrl4: string;

  @Prop()
  imageUrl5: string;

  @Prop()
  price: string;

  @Prop()
  sizes: Array<string>;

  @Prop()
  country_made_in: string;

  @Prop()
  outside_material: string;

  @Prop()
  inside_material: string;

  @Prop()
  brand: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Category' })
  categoryId: Category['_id'];
}

export const ProductSchema = SchemaFactory.createForClass(Product);
