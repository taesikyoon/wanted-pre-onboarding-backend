import { Company } from '../../company/models/company.entity';
import { BaseEntity } from '../../database/base.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { ApplicationHistory } from './application-history.entity';

@Entity('job_posting')
export class JobPosting extends BaseEntity {
  @Column()
  position: string;

  @Column()
  compensation: number;

  @Column()
  description: string;

  @Column({ name: 'technical_stack' })
  technicalStack: string;

  @Column({ name: 'company_id', type: 'bigint', unsigned: true })
  companyId: number;

  @ManyToOne(type => Company, company => company.jobPosting, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'company_id', referencedColumnName: 'id' })
  company: Company;

  @OneToMany(type => ApplicationHistory, applicationHistory => applicationHistory.jobPosting, { cascade: true })
  applicationHistory: ApplicationHistory;
}
