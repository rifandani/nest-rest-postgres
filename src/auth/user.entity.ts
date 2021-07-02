import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
// files
import { Task } from '../tasks/task.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  // With eager loading enabled on a relation you don't have to specify relation or join it - it will ALWAYS be loaded automatically.
  @OneToMany(() => Task, (task) => task.user, { eager: true })
  tasks: Task[];
}
