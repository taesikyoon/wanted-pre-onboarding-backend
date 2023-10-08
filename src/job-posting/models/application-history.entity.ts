import { BaseEntity } from '../../database/base.entity';
import { User } from '../../user/models/user.entity';
import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { JobPosting } from './job-posting.entity';

@Entity('application_history')
export class ApplicationHistory extends BaseEntity {
  @PrimaryColumn({ name: 'user_id', type: 'bigint', unsigned: true })
  userId: number;

  @PrimaryColumn({ name: 'job_posting_id', type: 'bigint', unsigned: true })
  jobPostingId: number;

  @ManyToOne(type => User, user => user.applicationHistory, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(type => JobPosting, jobPosting => jobPosting.applicationHistory, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'job_posting_id' })
  jobPosting: JobPosting;
}
