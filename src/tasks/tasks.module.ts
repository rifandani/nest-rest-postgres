import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
// files
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { TaskRepository } from './task.repository';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([TaskRepository]), // repository yg sudah extends entity
    AuthModule, // guarding all /tasks routes
  ],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}
