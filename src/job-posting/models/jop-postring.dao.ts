import { InjectRepository } from '@nestjs/typeorm';
import { JobPosting } from './job-posting.entity';
import { Repository } from 'typeorm';
import { CreateJobPostingDto } from '../dto/create-job-posting.dto';
import { FindManyJobPostingDto } from '../dto/find-many-job-posting.dto';

export class JobPostingDAO {
  constructor(@InjectRepository(JobPosting) private readonly jobPostingRepository: Repository<JobPosting>) {}

  async create(jobPosting: CreateJobPostingDto) {
    await this.jobPostingRepository.insert(jobPosting);
  }

  async findMany(findManyOptions: FindManyJobPostingDto) {
    const skip = (findManyOptions.page - 1) * findManyOptions.items;
    const take = findManyOptions.items;
    // 정렬의 기준은 create_at으로 했으나 seed로 생성된 데이터들로 인해 id를 기준으로 정렬하도록 변경
    return await this.jobPostingRepository.find({ skip, take, order: { id: findManyOptions.sort }, cache: true });
  }
}
