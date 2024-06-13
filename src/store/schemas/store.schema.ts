import { Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type StoreDocument = HydratedDocument<Store>;

@Schema({
  timestamps: true,
  versionKey: '__v',
})
// temporary models
export class Store {
  name: string;
  description: string;
  searchTags: string[];
  storeType: string;
  address: string;
  contact: {
    phone: string;
    email: string;
    website: string;
  };
  socials: {
    facebook: string;
    instagram: string;
    youtube: string;
  };
  meta: {
    title: string;
    description: string;
    keywords: string[];
  };
}

export const StoreSchema = SchemaFactory.createForClass(Store);
