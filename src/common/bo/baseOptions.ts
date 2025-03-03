import { ApiProperty } from "@nestjs/swagger";

export class BaseOptions<L, V> {
  constructor(label: L, value: V) {
    this.label = label;
    this.value = value;
  }

  @ApiProperty()
  label: L;

  @ApiProperty()
  value: V;
}
