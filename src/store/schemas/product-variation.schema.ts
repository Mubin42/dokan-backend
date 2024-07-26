import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Store } from './store.schema';
import { Product } from './product.schema';

export type ProductVariationDocument = HydratedDocument<ProductVariation>;

@Schema({
  timestamps: true,
  versionKey: '__v',
})
export class ProductVariation {
  // Reference of the store
  @Prop({
    required: true,
    ref: Store.name,
  })
  store: mongoose.Schema.Types.ObjectId;

  @Prop({
    required: true,
    ref: Product.name,
  })
  product: mongoose.Schema.Types.ObjectId;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  price: number;
}

export const ProductVariationSchema =
  SchemaFactory.createForClass(ProductVariation);
