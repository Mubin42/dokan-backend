import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type StoreConfigDocument = HydratedDocument<StoreConfig>;

@Schema({
  timestamps: true,
  versionKey: '__v',
})
export class StoreConfig {
  @Prop({
    ref: 'Store',
  })
  store: mongoose.Schema.Types.ObjectId;

  @Prop({
    required: true,
    default: true,
  })
  isActive: boolean;

  @Prop({
    required: true,
  })
  apiKey: string;
}

export const StoreConfigSchema = SchemaFactory.createForClass(StoreConfig);
