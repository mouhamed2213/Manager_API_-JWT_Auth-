import {
  Inject,
  Injectable,
  ConflictException,
  UnauthorizedException,
  NotFoundException,
} from '@nestjs/common';
import { CreaateUserDto } from './DTO/user.dto';
import { DRIZZLE_TOKEN } from '../../config/connection.module';
import { User } from './interface';
import { UserTable } from 'src/db/schemas/users.schema';
import * as bcrypt from 'bcrypt';
import { and, eq } from 'drizzle-orm';
import { FindUserDto } from './DTO/user.dto';
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

      const [newUser] = await this.db.insert(UserTable).values(insertUser);
      if (!newUser) {
        // Sécurité au cas où l'insertion échouerait silencieusement
        throw new Error("La création de l'utilisateur a échoué.");
      }
      return newUser;

      //
    } catch (error) {
      if (error.cause && error.cause['code'] === 'ER_DUP_ENTRY') {
        throw new ConflictException('Cet email est déjà utilisé.');
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

  // find one user
  async findOne(data: FindUserDto): Promise<User> {
    try {
      const { email, password } = data;
      console.log('USER DATA ', email, password);
      // find user query
      const [user] = await this.db
        .select()
        .from(UserTable)
        .where(eq(UserTable.email, email));
      if (!user) {
        throw new NotFoundException('User or passwor incorrect [p]');
      }

      // compare password
      const checkPassword = await bcrypt.compare(password, user.password);
      if (!checkPassword) {
        throw new UnauthorizedException('User or passwor incorrect [p]');
      }
      return user;
    } catch (error) {
      console.log('Error : ', error);
      throw error;
    }
  }
}
