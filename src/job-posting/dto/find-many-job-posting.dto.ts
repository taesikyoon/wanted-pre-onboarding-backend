import { IsIn, IsNumber } from 'class-validator';

export class FindManyJobPostingDto {
  @IsNumber()
  page = 1;

  @IsNumber()
  items = 10;

  @IsIn(['DESC', 'ASC'])
  sort: 'DESC' | 'ASC' = 'DESC';
}
