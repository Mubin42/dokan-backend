import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { compare, hash } from 'bcrypt';
import mongoose, { HydratedDocument } from 'mongoose';
import { Store } from 'src/store/schemas/store.schema';

export type StoreAdminDocument = HydratedDocument<StoreAdmin>;

@Schema({
  timestamps: true,
  versionKey: '__v',
})
export class StoreAdmin {
  @Prop({ required: true, ref: Store.name })
  store: mongoose.Schema.Types.ObjectId;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true, default: 'store-admin' })
  role: string;

  @Prop({ required: true, default: true })
  isActive: boolean;

  @Prop()
  phone: string;

  validatePassword: (password: string) => Promise<boolean>;
}

export const StoreAdminSchema = SchemaFactory.createForClass(StoreAdmin);

// Validate password method
StoreAdminSchema.methods.validatePassword = async function (
  password: string,
): Promise<boolean> {
  const match = await compare(password, this.password);
  return match;
};

// Pre save middleware
StoreAdminSchema.pre('save', async function (next) {
  // if the password is not modified, skip this middleware
  if (!this.isModified('password')) return next();

  // if password is modified
  const hashedPassword = await hash(this.password, 10);
  this.password = hashedPassword;
  next();
});
