import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

// type of the system config
export enum ConfigValueType {
  object = 'object',
  string = 'string',
  number = 'number',
  boolean = 'boolean',
  array = 'array',
  date = 'date',
}

export type SystemConfigType = HydratedDocument<SystemConfig>;

@Schema({
  timestamps: true,
  versionKey: '__v',
})
export class SystemConfig {
  @Prop({ required: true, unique: true })
  key: string;

  @Prop({ required: true, type: mongoose.Schema.Types.Mixed })
  value: any;

  @Prop({ required: true, enum: ConfigValueType })
  type: ConfigValueType;
}

export const SystemConfigSchema = SchemaFactory.createForClass(SystemConfig);
