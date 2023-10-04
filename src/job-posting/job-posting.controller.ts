import { Body, Controller, Post } from '@nestjs/common';
import { JobPostingService } from './job-posting.service';
import { CreateJobPostingDto } from './dto/create-job-posting.dto';

@Controller('job-posting')
export class JobPostingController {
  constructor(private readonly jobPostingService: JobPostingService) {}
  // find = empty
  // get = error
  @Post('/')
  async create(@Body() jobPosting: CreateJobPostingDto) {
    await this.jobPostingService.create(jobPosting);

    return {
      success: true,
      message: '채용 공고 등록에 성공하셨습니다.',
    };
  }
  async findMany() {}
  async getOne() {}
  async update() {}
  async delete() {}
  async search() {}
}
