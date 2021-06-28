// good practices pake class, biar tetap ada post-compilation
// + juga biar bisa sekalian validation menggunakan class-validator

import { IsEnum } from 'class-validator';
// files
import { TaskStatus } from '../task-status.enum';

export class UpdateTaskStatusDto {
  @IsEnum(TaskStatus)
  status: TaskStatus;
}
