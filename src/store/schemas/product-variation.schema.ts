import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
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

  @Prop({
    required: true,
    // Cannot use forwardRef here because ProductVariation is not a provider, but a schema, use hard reference instead to avoid circular dependency
    ref: 'Product',
  })
  product: mongoose.Schema.Types.ObjectId;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  price: number;
}

export const ProductVariationSchema =
  SchemaFactory.createForClass(ProductVariation);
