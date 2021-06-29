import { EntityRepository, Repository } from 'typeorm';
import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
// files
import { User } from './user.entity';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async createUser(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    const { username, password } = authCredentialsDto;

    // hash password
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);

    // create new user entity instance
    const user = this.create({ username, password: hashPassword });

    try {
      // save it to db
      await this.save(user);
    } catch (err) {
      console.error(err);

      // unique_violation
      // https://www.postgresql.org/docs/13/errcodes-appendix.html
      if (err.code === '23505') {
        throw new ConflictException('Username already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
}
