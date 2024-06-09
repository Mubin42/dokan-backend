import { plainToClass } from 'class-transformer';
import {
  IsDefined,
  IsNumberString,
  IsString,
  MinLength,
  validateSync,
} from 'class-validator';

// class validation for environment variables
class EnvironmentVariables {
  @IsDefined()
  @IsNumberString()
  @MinLength(1)
  PORT: string;

  @IsDefined()
  @IsString()
  @MinLength(1)
  DB_URL: string;
}

// function to validating the configurations
export function validateConfig(configuration: Record<string, unknown>) {
  const finalConfig = plainToClass(EnvironmentVariables, configuration, {
    enableImplicitConversion: true,
  });

  const errors = validateSync(finalConfig, {
    skipMissingProperties: false,
  });

  let index = 0;
  for (const err of errors) {
    Object.values(err.constraints).map((str) => {
      ++index;
      console.log(`Error ${index}: ${str}`);
    });
    console.log('\n ***** \n');
  }
  if (errors.length) {
    throw new Error('Config validation failed');
  }
  return finalConfig;
}
