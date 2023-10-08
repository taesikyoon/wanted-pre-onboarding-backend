import { InjectRepository } from '@nestjs/typeorm';
import { JobPosting } from './job-posting.entity';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { CreateJobPostingDTO } from '../dto/request/create-job-posting.dto';
import { FindManyJobPostingDTO } from '../dto/request/find-many-job-posting.dto';
import { UpdateJobPostingDTO } from '../dto/request/update-job-posting.dto';
import { BadRequestException } from '@nestjs/common';

export class JobPostingDAO {
  private readonly jobPostingsSelect: string[];
  constructor(@InjectRepository(JobPosting) private readonly jobPostingRepository: Repository<JobPosting>) {
    this.jobPostingsSelect = [
      'JB.id',
      'JB.position',
      'JB.technicalStack',
      'JB.compensation',
      'C.id',
      'C.name',
      'C.country',
      'C.region',
    ];
  }

  async create(jobPosting: CreateJobPostingDTO) {
    try {
      return (await this.jobPostingRepository.insert({ ...jobPosting })).identifiers[0].id;
    } catch {
      throw new BadRequestException('채용공고 등록에 실패했습니다.');
    }
  }

  async findMany(findManyOptions: FindManyJobPostingDTO) {
    const skip = (findManyOptions.page - 1) * findManyOptions.items;
    const take = findManyOptions.items;
    const jopPostingList = await this.jobPostingRepository
      .createQueryBuilder('JB')
      .select(this.jobPostingsSelect)
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

  async findManyByCompanyId(companyId: number, excludedJobId: number) {
    const queryBuilder = this.jobPostingRepository.createQueryBuilder('JB');

    if (excludedJobId) queryBuilder.select(['JB.id']);

    queryBuilder.where('JB.companyId = :companyId', { companyId });

    if (excludedJobId) queryBuilder.andWhere('JB.id <> :excludedJobId', { excludedJobId });

    return await queryBuilder.getMany();
  }

  async delete(id: number) {
    const deletedJobPosting = await this.jobPostingRepository
      .createQueryBuilder()
      .delete()
      .where('id = :id', { id })
      .execute();

    return deletedJobPosting.affected;
  }

  async search(keyword: string) {
    return await this.jobPostingRepository
      .createQueryBuilder('JB')
      .select(this.jobPostingsSelect)
      .leftJoin('JB.company', 'C')
      .where((qb: SelectQueryBuilder<JobPosting>) => {
        qb.where('C.region = :keyword', { keyword })
          .orWhere('JB.position LIKE :likeKeyword', { likeKeyword: `%${keyword}%` })
          .orWhere('JB.description LIKE :likeKeyword', { likeKeyword: `%${keyword}%` })
          .orWhere('JB.technicalStack LIKE :likeKeyword', { likeKeyword: `%${keyword}%` })
          .orWhere('C.country LIKE :likeKeyword', { likeKeyword: `%${keyword}%` })
          .orWhere('C.name LIKE :likeKeyword', { likeKeyword: `%${keyword}%` });
      })
      .getMany();
  }
}
