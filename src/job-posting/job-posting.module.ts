import { Module } from '@nestjs/common';
import { JobPostingService } from './job-posting.service';
import { JobPostingController } from './job-posting.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JobPosting } from './models/job-posting.entity';
import { ApplicationHistory } from './models/application-history.entity';
import { JobPostingDAO } from './models/jop-posting.dao';

@Module({
  imports: [TypeOrmModule.forFeature([JobPosting, ApplicationHistory])],
  controllers: [JobPostingController],
  providers: [JobPostingService, JobPostingDAO],
})
export class JobPostingModule {}
