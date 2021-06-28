import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
// files
import { TasksModule } from './tasks/tasks.module';

@Module({
  imports: [
    TasksModule,
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
  ],
})
export class AppModule {}
