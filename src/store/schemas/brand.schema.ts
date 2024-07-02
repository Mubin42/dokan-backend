import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type BrandDocument = HydratedDocument<Brand>;

@Schema({
  timestamps: true,
  versionKey: '__v',
})
export class Brand {
  @Prop({ required: true })
  name: string;

  @Prop()
  logo: string;

  @Prop()
  description: string;
}

export const BrandSchema = SchemaFactory.createForClass(Brand);
