import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type StoreAdminDocument = HydratedDocument<StoreAdmin>;

@Schema({
  timestamps: true,
  versionKey: '__v',
})
export class StoreAdmin {
  // TODO: Change this to store model reference
  @Prop({ required: true })
  store: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  password: string;

  validatePassword: (password: string) => boolean;
}

export const StoreAdminSchema = SchemaFactory.createForClass(StoreAdmin);

StoreAdminSchema.methods.validatePassword = function (
  password: string,
): boolean {
  return this.password === password;
};
