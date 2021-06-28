import { EntityRepository, Repository } from 'typeorm';
// files
import { Task } from './task.entity';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatus } from './task-status.enum';

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
  // find task by title
  findByTitle(title: string): Promise<Task[]> {
    return this.createQueryBuilder('task')
      .where('task.firstName = :title', { title })
      .getMany();
  }

  // create task with default task.status = OPEN
  async getTasks(filterDto: GetTasksFilterDto): Promise<Task[]> {
    const { search, status } = filterDto;

    // create new query
    const query = this.createQueryBuilder('task');

    // if there is status
    if (status) {
      query.andWhere('task.status = :status', { status });
    }

    // if there is search
    if (search) {
      query.andWhere(
        'LOWER(task.title) LIKE LOWER(:search) OR LOWER(task.description) LIKE LOWER(:search)',
        { search: `%${search}%` }, // look for parts / partials of that search
      );
    }

    // get and return tasks
    const tasks = await query.getMany();
    return tasks;
  }

  // create task with default task.status = OPEN
  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    const { title, description } = createTaskDto;

    // create new entity instance
    const task = this.create({
      title,
      description,
      status: TaskStatus.OPEN,
    });

    // save new entity to db
    await this.save(task);

    return task;
  }
}
