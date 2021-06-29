import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
// files
import { TasksModule } from './tasks/tasks.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'rizeki',
      password: 'rifandani',
      database: 'task-management',
      autoLoadEntities: true,
      synchronize: true, // set to false in prod
    }),
    TasksModule,
    AuthModule,
  ],
})
export class AppModule {}
