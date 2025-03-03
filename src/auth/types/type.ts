import { Request } from 'express';
import { User } from 'src/user/entities/user.entity';

export type JwtPayload = Partial<User> & {
  sub: string;
  // is_admin: boolean;
};

export interface JwtRequest extends Request {
  user: JwtPayload;
}
