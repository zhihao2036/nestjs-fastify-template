import { ApiProperty } from "@nestjs/swagger";

export class BaseListResponse<T> {
  constructor(list: T[], total = 0, page_index = 1, page_size = 10) {
    this.list = list;
    this.total = total;
    this.page_index = +page_index;
    this.page_size = +page_size;
  }

  @ApiProperty()
  list: T[];

  @ApiProperty()
  total: number;

  @ApiProperty()
  page_index: number;

  @ApiProperty()
  page_size: number;
}
