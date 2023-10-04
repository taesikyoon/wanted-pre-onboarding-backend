import { SoftDeleteEntity } from '../../database/base.entity';
import { JobPosting } from '../../job-posting/models/job-posting.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity('company')
export class Company extends SoftDeleteEntity {
  @Column()
  name: string;

  @Column()
  country: string;

  @Column()
  region: string;

  @OneToMany(type => JobPosting, jobPosting => jobPosting.company, { cascade: true })
  jobPosting: JobPosting[];
}
