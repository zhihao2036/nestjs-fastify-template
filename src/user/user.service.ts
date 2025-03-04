import { Injectable, Logger } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RegisterDTO } from 'src/auth/dto/register.dto';
import { BaseCreateResponse } from 'src/common/bo/baseCreateResponse';
import { hashPassword } from 'src/common/utils/password-crypto';
import { IdUtil } from 'src/common/utils/id-util';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  /**
   * select user by id
   *
   * @param id - string
   * @param needPassword - boolean
   * @returns - User | null
   */
  findOneById(id: string, needPassword = false): Promise<User | null> {
    const qb = this.usersRepository
      .createQueryBuilder('u')
      .select('u.*')
      .where('u.id = :id', { id })
      .limit(1);
    needPassword && qb.addSelect('u.password');
    return qb.getOne();
  }

  /**
   * select user by username
   *
   * @param username - string
   * @param needPassword - boolean
   * @returns - User | null
   */
  findOneByUsername(
    username: string,
    needPassword = false,
  ): Promise<User | null> {
    const qb = this.usersRepository
      .createQueryBuilder('u')
      .select('u.*')
      .where('u.username = :username', { username })
      .limit(1);
    needPassword && qb.addSelect('u.password');
    return qb.getOne();
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.softDelete(id);
  }

  async register(registerDTO: RegisterDTO): Promise<BaseCreateResponse> {
    const { username, email, phone, password } = registerDTO;
    const encodePassword = await hashPassword(password);
    const entity = new User();
    entity.id = IdUtil.getSnowflakeID();
    entity.username = username;
    entity.password = encodePassword;
    entity.phone = phone;
    entity.email = email;
    this.usersRepository.create(entity);
    this.logger.log(entity, typeof entity.id);
    return new BaseCreateResponse(entity.id);
  }
}
