import { Type } from 'class-transformer';
import { IsIn, IsInt } from 'class-validator';

export class FindManyJobPostingDTO {
  @IsInt()
  @Type(() => Number)
  page = 1;

  @IsInt()
  @Type(() => Number)
  items = 10;

  @IsIn(['DESC', 'ASC'])
  sort: 'DESC' | 'ASC' = 'DESC';
}
