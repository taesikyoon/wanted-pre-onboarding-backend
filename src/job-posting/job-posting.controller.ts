import { Controller } from '@nestjs/common';
import { JobPostingService } from './job-posting.service';

@Controller('job-posting')
export class JobPostingController {
  constructor(private readonly jobPostingService: JobPostingService) {}
}
