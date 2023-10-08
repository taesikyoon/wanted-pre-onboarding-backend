import { JobPostingDAO } from './models/jop-posting.dao';
import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateJobPostingDTO } from './dto/request/create-job-posting.dto';
import { FindManyJobPostingDTO } from './dto/request/find-many-job-posting.dto';
import { UpdateJobPostingDTO } from './dto/request/update-job-posting.dto';
import { JobPostingMapper } from './dto/response/jop-posting-list.mapper';
import { UpdatedJobPostingMapper } from './dto/response/updated-job-posting.mapper';
import { GetOneJobPostingMapper } from './dto/response/get-one-jop-posting.mapper';
import { ApplicationHistoryDAO } from './models/application-history.dao';

@Injectable()
export class JobPostingService {
  constructor(
    private readonly jobPostingDAO: JobPostingDAO,
    private readonly applicationHistoryDAO: ApplicationHistoryDAO,
  ) {}

  async create(jobPosting: CreateJobPostingDTO) {
    return await this.jobPostingDAO.create(jobPosting);
  }

  async findMany(findManyOptions: FindManyJobPostingDTO) {
    const jobPostingList = await this.jobPostingDAO.findMany(findManyOptions);

    return jobPostingList.map(item => new JobPostingMapper(item));
  }

  async update(updateData: UpdateJobPostingDTO, jopPostingId: number) {
    const isUpdated = await this.jobPostingDAO.update(updateData, jopPostingId);

    if (!isUpdated) throw new BadRequestException('채용공고 업데이트에 실패했습니다.');

    const updatedJobPosting = await this.jobPostingDAO.getOne(jopPostingId);

    return new UpdatedJobPostingMapper(updatedJobPosting);
  }

  async getOne(jobPostingId: number) {
    const jobPosting = await this.jobPostingDAO.getOne(jobPostingId);

    const otherJobPostings = (await this.jobPostingDAO.findManyByCompanyId(jobPosting.companyId, jobPosting.id)).map(
      item => item.id,
    );

    return new GetOneJobPostingMapper({ ...jobPosting, otherJobPostings });
  }

  async delete(jopPostingId: number) {
    await this.jobPostingDAO.getOne(jopPostingId);
    const isDeleted = await this.jobPostingDAO.delete(jopPostingId);

    if (!isDeleted) throw new BadRequestException('채용공고 삭제에 실패했습니다.');
  }

  async search(keyword: string) {
    const searchedList = await this.jobPostingDAO.search(keyword);
    return searchedList.map(item => new JobPostingMapper(item));
  }

  async apply(jobPostingId: number, userId: number) {
    const isExist = await this.applicationHistoryDAO.findOne(jobPostingId, userId);

    if (isExist) throw new BadRequestException('이미 지원한 채용공고입니다.');

    return await this.applicationHistoryDAO.apply(jobPostingId, userId);
  }
}
