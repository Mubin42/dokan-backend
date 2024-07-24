import { Prop, Schema } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Store } from './store.schema';

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

  // Add reference of the product
  product: mongoose.Schema.Types.ObjectId;
}
