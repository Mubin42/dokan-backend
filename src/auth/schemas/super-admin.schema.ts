import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { compare, hash } from 'bcrypt';
import { HydratedDocument } from 'mongoose';

export type SuperAdminDocument = HydratedDocument<SuperAdmin>;

@Schema({
  timestamps: true,
  versionKey: '__v',
})
export class SuperAdmin {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, index: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true, default: 'super-admin' })
  role: string;

  @Prop({ required: true, default: true })
  isActive: boolean;

  @Prop()
  phone: string;

  validatePassword: (password: string) => Promise<boolean>;
}

export const SuperAdminSchema = SchemaFactory.createForClass(SuperAdmin);

SuperAdminSchema.methods.validatePassword = async function (
  password: string,
): Promise<boolean> {
  const match = await compare(password, this.password);
  return match;
};

SuperAdminSchema.pre('save', async function (next) {
  // if the password is not modified, skip this middleware
  if (!this.isModified('password')) return next();

  // if password is modified
  const hashedPassword = await hash(this.password, 10);
  this.password = hashedPassword;
  next();
});
