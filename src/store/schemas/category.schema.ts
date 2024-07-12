import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Store } from './store.schema';

export type CategoryDocument = HydratedDocument<Category>;

@Schema({
  timestamps: true,
  versionKey: '__v',
})
export class Category {
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

export const CategorySchema = SchemaFactory.createForClass(Category);
