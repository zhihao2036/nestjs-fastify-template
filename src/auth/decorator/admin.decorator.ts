import { SetMetadata } from '@nestjs/common';
import { PagesEnum } from 'src/common/enum/pages.enum';

export const IS_ADMIN_KEY = 'isAdmin';

export const Admin = (...roles: PagesEnum[]) =>
  SetMetadata(IS_ADMIN_KEY, roles);
