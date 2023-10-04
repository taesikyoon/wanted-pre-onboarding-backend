import { BaseEntity } from '../../database/base.entity';
import { User } from '../../user/models/user.entity';
import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { JobPosting } from './job-posting.entity';

@Entity('application-history')
export class ApplicationHistory extends BaseEntity {
  @PrimaryColumn({ type: 'bigint', unsigned: true })
  userId: number;

  @PrimaryColumn({ type: 'bigint', unsigned: true })
  jobPostingId: number;

  @ManyToOne(type => User, user => user.applicationHistory, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: User;

  @ManyToOne(type => JobPosting, jobPosting => jobPosting.applicationHistory, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'jobPostingId' })
  jobPosting: JobPosting;
}
