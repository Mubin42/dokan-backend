import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Store } from './store.schema';

export type BrandDocument = HydratedDocument<Brand>;

@Schema({
  timestamps: true,
  versionKey: '__v',
})
export class Brand {
  // Pass the reference to the Store schema
  @Prop({
    required: true,
    ref: Store.name,
  })
  store: mongoose.Schema.Types.ObjectId;

  @Prop({ required: true })
  name: string;

  @Prop()
  logo: string;

  @Prop()
  description: string;
}

export const BrandSchema = SchemaFactory.createForClass(Brand);
