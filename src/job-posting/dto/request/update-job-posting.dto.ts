import { OmitType, PartialType } from '@nestjs/mapped-types';
import { CreateJobPostingDTO } from './create-job-posting.dto';

export class UpdateJobPostingDTO extends PartialType(OmitType(CreateJobPostingDTO, ['companyId'] as const)) {}
