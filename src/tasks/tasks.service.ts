import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
// files
import { TaskStatus } from './task-status.enum';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskRepository } from './task.repository';
import { Task } from './task.entity';
import { User } from '../auth/user.entity';

// Services, or so called Data Access Object (Data Access Object)

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskRepository)
    private taskRepository: TaskRepository,
  ) {}

  getTasks(filterDto: GetTasksFilterDto, user: User): Promise<Task[]> {
    return this.taskRepository.getTasks(filterDto, user);
  }

  async getTaskById(id: string, user: User): Promise<Task> {
    // find task by id and user
    const found = await this.taskRepository.findOne({ where: { id, user } });

    // if not found, throws 404
    if (!found) {
      throw new NotFoundException(`Task with id: ${id} not found`);
    }

    return found;
  }

  createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    return this.taskRepository.createTask(createTaskDto, user);
  }

  async updateTaskStatus(
    id: string,
    status: TaskStatus,
    user: User,
  ): Promise<Task> {
    // find task, if not found automatically throws 404
    const task = await this.getTaskById(id, user);

    // update task
    task.status = status;

    // save to db
    await this.taskRepository.save(task);

    return task;
  }

  async deleteTaskById(id: string, user: User): Promise<void> {
    // using .delete() instead of .remove() to minimize db calls
    const result = await this.taskRepository.delete({ id, user });

    // if there is no row affected by deletion actions, means not found
    if (result.affected === 0) {
      throw new NotFoundException(`Task with id: ${id} not found`);
    }
  }
}

//   getTasksWithFilters(filterDto: GetTasksFilterDto): Task[] {
//     const { search, status } = filterDto;

//     let filteredTasks = this.getAllTasks();

//     // if there is status
//     if (status) {
//       filteredTasks = filteredTasks.filter((task) => task.status === status);
//     }

//     // if there is search
//     if (search) {
//       filteredTasks = filteredTasks.filter(
//         (task) =>
//           task.title.toLowerCase().includes(search.toLowerCase()) ||
//           task.description.toLowerCase().includes(search.toLowerCase()),
//       );
//     }

//     return filteredTasks;
//   }
