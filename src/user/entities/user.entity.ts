import { ApiProperty } from '@nestjs/swagger';
import {
  Entity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { GenderEnum } from '../types/type';

@Entity('user')
export class User {
  @ApiProperty({
    description: 'id',
  })
  @PrimaryColumn()
  id: string;

  @ApiProperty()
  @Column()
  avatar: string;

  @ApiProperty({
    enum: GenderEnum,
  })
  @Column({
    default: GenderEnum.OTHER,
    enum: GenderEnum,
  })
  gender: number;

  @ApiProperty()
  @Column()
  username: string;

  @ApiProperty({
    description: 'never return to client',
  })
  @Column({
    select: false,
  })
  password: string;

  @ApiProperty()
  @Column()
  email: string;

  @ApiProperty()
  @Column()
  phone: string;

  @ApiProperty({
    description: 'mobile phone area code',
  })
  @Column()
  phone_prefix: string;

  @ApiProperty({
    description: 'disabled status',
    default: false,
  })
  @Column({
    default: false,
  })
  is_disabled: boolean;

  @ApiProperty()
  @DeleteDateColumn({ select: false })
  deleted_at: Date;

  @ApiProperty()
  @CreateDateColumn()
  created_at: Date;

  @ApiProperty()
  @UpdateDateColumn()
  updated_at: Date;
}
