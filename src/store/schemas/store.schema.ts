import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

type KeyValuePair = {
  key: string;
  value: string;
};

export type StoreDocument = HydratedDocument<Store>;

@Schema({
  timestamps: true,
  versionKey: '__v',
})
export class Store {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  storeType: string;

  @Prop()
  description: string;
  @Prop()
  searchTags: string[];
  // TODO: make this the reference of the address schema
  @Prop()
  address: string;

  @Prop({ type: Object })
  contact: {
    phone: string;
    email: string;
    website: string;
  };
  @Prop({ type: [Object] })
  socials: KeyValuePair[];

  @Prop({ type: Object })
  meta: {
    title: string;
    description: string;
    keywords: string[];
  };
}

export const StoreSchema = SchemaFactory.createForClass(Store);
