import {
  ForbiddenException,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { LoginPasswordDTO } from './dto/login.dto';
import { comparePassword } from 'src/common/utils/password-crypto';
import { User } from 'src/user/entities/user.entity';
import { JwtPayload } from './types/type';
import { RedisUtil } from 'src/common/utils/redis-util';
import { RegisterDTO } from './dto/register.dto';
import { BaseCreateResponse } from 'src/common/bo/baseCreateResponse';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  private readonly redis = RedisUtil.getRedis();

  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUsernamePassword(
    username,
    password,
  ): Promise<Omit<User, 'password'>> {
    const user = await this.userService.findOneByUsername(username, true);
    if (!user) {
      this.logger.warn(`unregistered user: ${username}`);
      throw new UnauthorizedException('unregistered user');
    }
    if (user.is_disabled) {
      this.logger.warn(`user is disabled: ${username}`);
      throw new ForbiddenException('user is disabled');
    }
    try {
      const match = await comparePassword(password, user.password);
      if (match) {
        const { password, ...result } = user;
        return result;
      }
      this.logger.warn(`password error: ${username}`);
      throw new UnauthorizedException('password error');
    } catch (error) {
      this.logger.error(error.message);
      throw new UnauthorizedException(error.message || 'password error');
    }
  }

  private async generateAccessToken(user: Omit<User, 'password'>) {
    const payload: JwtPayload = {
      ...user,
      sub: user.id,
    };
    const token = this.jwtService.sign(payload);
    await this.redis.setex(
      `login:${user.id}`,
      process.env.JWT_REDIS_EXPIRE,
      JSON.stringify({
        ...user,
        token,
      }),
    );
    return {
      access_token: `Bearer ${token}`,
    };
  }

  async loginByPassword(loginDTO: LoginPasswordDTO) {
    const user = await this.validateUsernamePassword(
      loginDTO.username,
      loginDTO.password,
    );
    return await this.generateAccessToken(user);
  }

  async register(registerDTO: RegisterDTO): Promise<BaseCreateResponse> {
    return this.userService.register(registerDTO);
  }
}
