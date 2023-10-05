import { Type } from 'class-transformer';
import { IsIn, IsInt, IsNumber } from 'class-validator';

export class FindManyJobPostingDto {
  @IsInt()
  @Type(() => Number)
  page = 1;

  @IsInt()
  @Type(() => Number)
  items = 10;

  @IsIn(['DESC', 'ASC'])
  sort: 'DESC' | 'ASC' = 'DESC';
}
