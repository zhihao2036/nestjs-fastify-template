import { ApiProperty } from '@nestjs/swagger';

export class BaseCreateResponse {
  constructor(id: string) {
    this.id = id;
  }

  @ApiProperty()
  id: string;
}
