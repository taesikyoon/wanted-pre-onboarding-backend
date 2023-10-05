import { JobPostingDAO } from './models/jop-postring.dao';
import { Injectable } from '@nestjs/common';
import { CreateJobPostingDto } from './dto/create-job-posting.dto';
import { FindManyJobPostingDto } from './dto/find-many-job-posting.dto';

@Injectable()
export class JobPostingService {
  constructor(private readonly jobPostingDAO: JobPostingDAO) {}

  async create(jobPosting: CreateJobPostingDto) {
    await this.jobPostingDAO.create(jobPosting);
  }

  async findMany(findManyOptions: FindManyJobPostingDto) {
    return await this.jobPostingDAO.findMany(findManyOptions);
  }
}
