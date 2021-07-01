import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
// files
import { TasksModule } from './tasks/tasks.module';
import { AuthModule } from './auth/auth.module';
import { validate } from './env.validation';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [`.${process.env.STAGE}.env`],
      validate,
    }),
    // async => wait for ConfigModule to initialized
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const isProd = configService.get('STAGE') === 'prod';

        return {
          ssl: isProd,
          extra: {
            ssl: isProd ? { rejectUnauthorized: false } : null,
          },
          type: 'postgres',
          host: configService.get('DB_HOST'),
          port: +configService.get('DB_PORT'),
          username: configService.get('DB_USERNAME'),
          password: configService.get('DB_PASSWORD'),
          database: configService.get('DB_DATABASE'),
          autoLoadEntities: true,
          synchronize: isProd ? false : true, // set to false in prod
        };
      },
    }),
    TasksModule,
    AuthModule,
  ],
})
export class AppModule {}
