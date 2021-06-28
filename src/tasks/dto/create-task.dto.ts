// good practices pake class, biar tetap ada post-compilation
// + juga biar bisa sekalian validation menggunakan class-validator

import { IsNotEmpty } from 'class-validator';

export class CreateTaskDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;
}
