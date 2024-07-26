import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Store } from './store.schema';
import { ProductVariation } from './product-variation.schema';

export type ProductDocument = HydratedDocument<Product>;

@Schema({
  timestamps: true,
  versionKey: '__v',
})
export class Product {
  @Prop({
    required: true,
    ref: Store.name,
  })
  store: mongoose.Schema.Types.ObjectId;

  @Prop({ required: true })
  name: string;

  @Prop()
  shortDescription: string;

  @Prop()
  description: string;

  @Prop({
    ref: ProductVariation.name,
  })
  variations: mongoose.Schema.Types.ObjectId[];
}

export const ProductSchema = SchemaFactory.createForClass(Product);
