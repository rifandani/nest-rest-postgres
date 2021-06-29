import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
// files
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { TaskRepository } from './task.repository';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([TaskRepository]), // repository yg sudah extends entity
    AuthModule,
  ],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}
