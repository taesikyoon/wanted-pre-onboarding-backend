import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { JobPostingService } from './job-posting.service';
import { CreateJobPostingDto } from './dto/create-job-posting.dto';
import { FindManyJobPostingDto } from './dto/find-many-job-posting.dto';

@Controller('job-postings')
export class JobPostingController {
  constructor(private readonly jobPostingService: JobPostingService) {}

  @Post('/')
  async create(@Body() jobPosting: CreateJobPostingDto) {
    await this.jobPostingService.create(jobPosting);

    return {
      success: true,
      message: '채용 공고 등록에 성공하셨습니다.',
    };
  }

  @Get('/')
  async findMany(@Query() findManyOptions: FindManyJobPostingDto) {
    const data = await this.jobPostingService.findMany(findManyOptions);

    return {
      success: true,
      message: '채용 공고 리스트를 조회했습니다.',
      data,
    };
  }
  async getOne() {}
  async update() {}
  async delete() {}
  async search() {}
}
