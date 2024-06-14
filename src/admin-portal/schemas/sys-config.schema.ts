import { Prop, Schema } from '@nestjs/mongoose';

// type of the system config
enum ConfigType {
  object = 'object',
  string = 'string',
  number = 'number',
  boolean = 'boolean',
  array = 'array',
  date = 'date',
}

@Schema({
  timestamps: true,
  versionKey: '__v',
})
export class SystemConfigSchema {
  @Prop({ required: true, unique: true })
  key: string;

  @Prop({ required: true })
  value: any;

  @Prop({ required: true, enum: ConfigType })
  type: ConfigType;
}
