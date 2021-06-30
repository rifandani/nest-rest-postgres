import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
// files
import { Task } from 'src/tasks/task.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @OneToMany(() => Task, (task) => task.user, { eager: true }) // automatically fetch tasks data
  tasks: Task[];
}
