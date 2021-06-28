// good practices pake class, biar tetap ada post-compilation
// + juga biar bisa sekalian validation menggunakan class-validator

import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
// files
import { TaskStatus } from '../task-status.enum';

export class GetTasksFilterDto {
  @IsOptional()
  @IsEnum(TaskStatus)
  status: TaskStatus;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  search: string;
}
