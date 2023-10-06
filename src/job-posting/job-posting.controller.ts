import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { JobPostingService } from './job-posting.service';
import { CreateJobPostingDTO } from './dto/request/create-job-posting.dto';
import { FindManyJobPostingDTO } from './dto/request/find-many-job-posting.dto';
import { UpdateJobPostingDTO } from './dto/request/update-job-posting.dto';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('job-postings')
export class JobPostingController {
  constructor(private readonly jobPostingService: JobPostingService) {}

  @Post('/')
  async create(@Body() jobPosting: CreateJobPostingDTO) {
    const data = await this.jobPostingService.create(jobPosting);

    return {
      success: true,
      message: '채용공고 등록에 성공하셨습니다.',
      data: { id: data, ...jobPosting },
    };
  }

  @Get('/')
  async findMany(@Query() findManyOptions: FindManyJobPostingDTO) {
    const data = await this.jobPostingService.findMany(findManyOptions);

    return {
      success: true,
      message: '채용공고 리스트를 조회했습니다.',
      data,
    };
  }

  @Patch('/:id')
  async update(@Body() updateData: UpdateJobPostingDTO, @Param('id', ParseIntPipe) jopPostingId: number) {
    const data = await this.jobPostingService.update(updateData, jopPostingId);

    return { success: true, message: '채용공고를 정상적으로 수정했습니다.', data };
  }

  @Get('/:id')
  async getOne(@Param('id', ParseIntPipe) jopPostingId: number) {
    const data = await this.jobPostingService.getOne(jopPostingId);

    return { success: true, message: '채용공고 상세조회에 성공했습니다.', data };
  }

  @Delete('/:id')
  async delete(@Param('id', ParseIntPipe) jopPostingId: number) {
    await this.jobPostingService.delete(jopPostingId);

    return { success: true, message: '채용공고를 정상적으로 삭제했습니다.' };
  }

  @Post('/search')
  async search(@Query('keyword') keyword: string) {
    const data = await this.jobPostingService.search(keyword);

    return { success: true, message: '키워드로 채용공고 리스트를 조회했습니다.', data };
  }

  @Post(':id/apply')
  async apply(@Param('id', ParseIntPipe) jobPostingId: number, @Body('userId', ParseIntPipe) userId: number) {
    // 유저 정보는 토큰으로 받을 수 있으나 임의로 진행하여 Body에 받고 진행
    const data = await this.jobPostingService.apply(jobPostingId, userId);

    return { success: true, message: '채용공고에 지원에 성공했습니다.', data };
  }
}
