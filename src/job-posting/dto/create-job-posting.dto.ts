import { IsNumber, IsString } from 'class-validator';

export class CreateJobPostingDto {
  @IsNumber()
  companyId: number;

  @IsString()
  position: string;

  @IsNumber()
  compensation: number;

  @IsString()
  technicalStack: string;

  @IsString()
  description: string;
}
