import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
// files
import { TaskStatus } from './task-status.enum';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskRepository } from './task.repository';
import { Task } from './task.entity';

// Services, or so called Data Access Object (Data Access Object)

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskRepository)
    private taskRepository: TaskRepository,
  ) {}

  getTasks(filterDto: GetTasksFilterDto): Promise<Task[]> {
    return this.taskRepository.getTasks(filterDto);
  }

  async getTaskById(id: string): Promise<Task> {
    // find task by id
    const found = await this.taskRepository.findOne(id);

    // if not found, throws 404
    if (!found) {
      throw new NotFoundException(`Task with id: ${id} not found`);
    }

    return found;
  }

  createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    return this.taskRepository.createTask(createTaskDto);
  }

  async updateTaskStatus(id: string, status: TaskStatus): Promise<Task> {
    // find task, if not found automatically throws 404
    const task = await this.getTaskById(id);

    // update task
    task.status = status;

    // save to db
    await this.taskRepository.save(task);

    return task;
  }

  async deleteTaskById(id: string): Promise<void> {
    // using .delete() instead of .remove() to minimize db calls
    const result = await this.taskRepository.delete(id);

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
