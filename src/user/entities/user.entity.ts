import { ApiProperty } from '@nestjs/swagger';
import {
  Entity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

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
    enum: {
      1: 'male',
      2: 'female',
    },
  })
  @Column()
  gender: number;

  @ApiProperty()
  @Column()
  username: string;

  @ApiProperty()
  @Column()
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
  })
  @Column()
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
