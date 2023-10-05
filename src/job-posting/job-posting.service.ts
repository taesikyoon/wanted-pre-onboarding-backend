import { JobPostingDAO } from './models/jop-posting.dao';
import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateJobPostingDTO } from './dto/request/create-job-posting.dto';
import { FindManyJobPostingDTO } from './dto/request/find-many-job-posting.dto';
import { UpdateJobPostingDTO } from './dto/request/update-job-posting.dto';
import { JobPostingMapper } from './dto/response/jop-posting-list.mapper';
import { UpdatedJobPostingMapper } from './dto/response/updated-job-posting.mapper';

@Injectable()
export class JobPostingService {
  constructor(private readonly jobPostingDAO: JobPostingDAO) {}

  async create(jobPosting: CreateJobPostingDTO) {
    await this.jobPostingDAO.create(jobPosting);
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
}
