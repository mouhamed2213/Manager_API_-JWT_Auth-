import {
  Inject,
  Injectable,
  BadRequestException,
  ConflictException,
} from '@nestjs/common';
import { CreaateUserDto } from './DTO/user.dto';
import { DRIZZLE_TOKEN } from '../../config/connection.module';
import { User } from './interface';
import { UserTable } from 'src/db/schemas';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(@Inject(DRIZZLE_TOKEN) private db: any) {}

  // create user methode
  async createUser(creaateUserDto: CreaateUserDto): Promise<User> {
    // check if the users exist
    try {
      // Hash the password
      const hashPassword = await bcrypt.hash(creaateUserDto.password, 10);
      const insertUser = { ...creaateUserDto, password: hashPassword };

      const [user] = await this.db.insert(UserTable).values(insertUser);
      if (user.affectedRows > 0) {
        console.log('user Created ', user.insertId);
      }
      return user;

      //
    } catch (error) {
      if (error.cause['code'] === 'ER_DUP_ENTRY') {
        // error throwed from databas
        console.log('ERROR CODE ', error.cause['code']);
        throw new ConflictException('Email already exist');
      }
      throw error; // for every other error
    }
  }

  // find all user
  async find(): Promise<User> {
    try {
      const users = await this.db.select().from(UserTable);
      console.log('USERS FOUND');
      return users;
    } catch (error) {
      console.log('ERROR FIND USER    ', error);
      throw error;
    }
  }
}
