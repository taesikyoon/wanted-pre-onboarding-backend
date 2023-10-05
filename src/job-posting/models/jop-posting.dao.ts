import { InjectRepository } from '@nestjs/typeorm';
import { JobPosting } from './job-posting.entity';
import { Repository } from 'typeorm';
import { CreateJobPostingDTO } from '../dto/request/create-job-posting.dto';
import { FindManyJobPostingDTO } from '../dto/request/find-many-job-posting.dto';
import { JobPostingMapper } from '../dto/response/jop-posting-list.mapper';
import { UpdateJobPostingDTO } from '../dto/request/update-job-posting.dto';
import { BadRequestException } from '@nestjs/common';

export class JobPostingDAO {
  constructor(@InjectRepository(JobPosting) private readonly jobPostingRepository: Repository<JobPosting>) {}

  async create(jobPosting: CreateJobPostingDTO) {
    await this.jobPostingRepository.insert({ ...jobPosting });
  }

  async findMany(findManyOptions: FindManyJobPostingDTO) {
    const skip = (findManyOptions.page - 1) * findManyOptions.items;
    const take = findManyOptions.items;
    const jopPostingList = await this.jobPostingRepository
      .createQueryBuilder('JB')
      .select(['JB.id', 'JB.position', 'JB.technicalStack', 'JB.compensation', 'C.name', 'C.country', 'C.region'])
      .innerJoin('JB.company', 'C', 'JB.companyId = C.id')
      .orderBy('JB.createdAt', findManyOptions.sort)
      .offset(skip)
      .limit(take)
      .getMany();

    return jopPostingList;
  }

  async update(updateData: UpdateJobPostingDTO, id: number) {
    const updatedJobPosting = await this.jobPostingRepository
      .createQueryBuilder()
      .update()
      .set({ ...updateData })
      .where('id = :id', { id })
      .execute();

    return updatedJobPosting.affected;
  }

  async getOne(id: number) {
    try {
      const jobPosting = await this.jobPostingRepository
        .createQueryBuilder('JB')
        .where('JB.id = :id', { id })
        .getOneOrFail();

      return jobPosting;
    } catch {
      throw new BadRequestException('존재하지 않는 채용공고 입니다.');
    }
  }
}
