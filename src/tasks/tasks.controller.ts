import {
  Controller,
  Body,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
  Logger,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
// files
import { TasksService } from './tasks.service';
import { Task } from './task.entity';
import { User } from 'src/auth/user.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { GetUser } from 'src/auth/get-user.decorator';

@Controller('/tasks')
@UseGuards(AuthGuard())
export class TasksController {
  constructor(private tasksService: TasksService) {}

  private readonly logger = new Logger(TasksController.name, true); // use logger

  @Get()
  getTasks(
    @Query() filterDto: GetTasksFilterDto,
    @GetUser() user: User, // user A can only get tasks from user A, not another user
  ): Promise<Task[]> {
    this.logger.verbose(
      `getTasks (${JSON.stringify(filterDto)}, ${user.username})`,
    );

    return this.tasksService.getTasks(filterDto, user);
  }

  @Get('/:id')
  getTaskById(
    @Param('id') id: string,
    @GetUser() user: User, // user A can only get tasks from user A, not another user
  ): Promise<Task> {
    this.logger.verbose(`getTaskById (${id}, ${user.username}`);

    return this.tasksService.getTaskById(id, user);
  }

  @Post()
  createTask(
    @Body() createTaskDto: CreateTaskDto,
    @GetUser() user: User, // get user from request object (passport)
  ): Promise<Task> {
    this.logger.verbose(
      `createTask (${JSON.stringify(createTaskDto)}, ${user.username}`,
    );

    return this.tasksService.createTask(createTaskDto, user);
  }

  @Patch('/:id/status')
  updateTaskStatus(
    @Param('id') id: string,
    @Body() updateTaskStatusDto: UpdateTaskStatusDto,
    @GetUser() user: User,
  ): Promise<Task> {
    this.logger.verbose(
      `updateTaskStatus (${id}, ${JSON.stringify(updateTaskStatusDto)}, ${
        user.username
      }`,
    );

    return this.tasksService.updateTaskStatus(
      id,
      updateTaskStatusDto.status,
      user,
    );
  }

  @Delete('/:id')
  deleteTaskById(
    @Param('id') id: string,
    @GetUser() user: User,
  ): Promise<void> {
    this.logger.verbose(`deleteTaskById (${id}, ${user.username}`);

    return this.tasksService.deleteTaskById(id, user);
  }
}
