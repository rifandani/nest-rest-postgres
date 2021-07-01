// https:docs.nestjs.com/techniques/configuration#schema-validation
import { plainToClass } from 'class-transformer';
import { IsEnum, IsNumber, IsString, validateSync } from 'class-validator';

enum Stage {
  Development = 'dev',
  Production = 'prod',
  Test = 'test',
}

enum Environment {
  Development = 'development',
  Production = 'production',
  Test = 'test',
}

class EnvironmentVariables {
  @IsEnum(Stage)
  STAGE: Stage;

  @IsEnum(Environment)
  NODE_ENV: Environment;

  @IsString()
  DB_HOST: string;

  @IsNumber()
  DB_PORT: number;

  @IsString()
  DB_USERNAME: string;

  @IsString()
  DB_PASSWORD: string;

  @IsString()
  DB_DATABASE: string;

  @IsString()
  JWT_SECRET: string;
}

export function validate(config: Record<string, unknown>) {
  const validatedConfig = plainToClass(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  });

  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  // if there is any errors
  if (errors.length > 0) {
    throw new Error(errors.toString());
  }

  return validatedConfig;
}
