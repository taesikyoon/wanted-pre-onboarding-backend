import { InjectRepository } from '@nestjs/typeorm';
import { JobPosting } from './job-posting.entity';
import { Repository } from 'typeorm';
import { CreateJobPostingDTO } from '../dto/request/create-job-posting.dto';
import { FindManyJobPostingDTO } from '../dto/request/find-many-job-posting.dto';
import { JobPostingMapper } from '../dto/response/jop-posting-list.mapper';

export class JobPostingDAO {
  constructor(@InjectRepository(JobPosting) private readonly jobPostingRepository: Repository<JobPosting>) {}

  async create(jobPosting: CreateJobPostingDTO) {
    await this.jobPostingRepository.insert(jobPosting);
  }

  async findMany(findManyOptions: FindManyJobPostingDTO) {
    const skip = (findManyOptions.page - 1) * findManyOptions.items;
    const take = findManyOptions.items;
    const jopPostingList = await this.jobPostingRepository
      .createQueryBuilder('JB')
      .select(['JB.id', 'JB.position', 'JB.technicalStack', 'C.name', 'C.country', 'C.region'])
      .leftJoin('JB.company', 'C', 'JB.companyId = C.id')
      .orderBy('JB.createdAt', findManyOptions.sort)
      .offset(skip)
      .limit(take)
      .getMany();

    return jopPostingList.map(item => new JobPostingMapper(item));
  }
}
