import { Company } from '../../company/models/company.entity';
import { BaseEntity } from '../../database/base.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { ApplicationHistory } from './application-history.entity';

@Entity('job-posting')
export class JobPosting extends BaseEntity {
  @Column()
  position: string;

  @Column()
  compensation: number;

  @Column()
  description: string;

  @Column({ name: 'technical-stack' })
  technicalStack: string;

  @Column({ type: 'bigint', unsigned: true })
  companyId: number;

  @ManyToOne(type => Company, company => company.jobPosting, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'companyId', referencedColumnName: 'id' })
  company: Company;

  @OneToMany(type => ApplicationHistory, applicationHistory => applicationHistory.jobPosting, { cascade: true })
  applicationHistory: ApplicationHistory;
}

// 회사 - 이름, 국가, 지역
// 채용 공고 - 포지션, 포상금, 내용, 기술스택
// 유저 - 이메일

// 관계 설정
// 하나의 회사는 여러개의 채용 공고를 등록 가능 M-N
