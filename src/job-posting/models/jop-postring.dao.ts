import { InjectRepository } from '@nestjs/typeorm';
import { JobPosting } from './job-posting.entity';
import { Repository } from 'typeorm';
import { CreateJobPostingDto } from '../dto/create-job-posting.dto';

export class JobPostingDAO {
  constructor(@InjectRepository(JobPosting) private readonly jobPostingRepository: Repository<JobPosting>) {}

  async create(jobPosting: CreateJobPostingDto) {
    await this.jobPostingRepository.insert(jobPosting);
  }
}
