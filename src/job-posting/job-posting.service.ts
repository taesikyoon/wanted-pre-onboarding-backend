import { JobPostingDAO } from './models/jop-postring.dao';
import { Injectable } from '@nestjs/common';
import { CreateJobPostingDto } from './dto/create-job-posting.dto';

@Injectable()
export class JobPostingService {
  constructor(private readonly jobPosting: JobPostingDAO) {}
  async create(jobPosting: CreateJobPostingDto) {
    await this.jobPosting.create(jobPosting);
  }
}
