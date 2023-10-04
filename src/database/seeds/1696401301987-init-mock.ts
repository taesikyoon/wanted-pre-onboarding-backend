import { Company } from 'src/company/models/company.entity';
import { JobPosting } from 'src/job-posting/models/job-posting.entity';
import { User } from 'src/user/models/user.entity';
import { MigrationInterface, QueryRunner } from 'typeorm';

const userSeeds = [
  {
    id: 1,
    email: 'testEmail-one@naver.com',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 2,
    email: 'testEmail-two@naver.com',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 3,
    email: 'testEmail-three@naver.com',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 4,
    email: 'testEmail-four@naver.com',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 5,
    email: 'testEmail-five@naver.com',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

const companySeeds = [
  { id: 1, name: '원티드', country: '한국', region: '대구', createdAt: new Date(), updatedAt: new Date() },
  { id: 2, name: '카카오', country: '한국', region: '원주', createdAt: new Date(), updatedAt: new Date() },
  { id: 3, name: '네이버', country: '한국', region: '부산', createdAt: new Date(), updatedAt: new Date() },
  { id: 4, name: '원티드랩', country: '한국', region: '전주', createdAt: new Date(), updatedAt: new Date() },
  { id: 5, name: '원티드코리아', country: '한국', region: '서울', createdAt: new Date(), updatedAt: new Date() },
];
const jobPostingSeeds = [
  {
    id: 1,
    position: '백엔드 주니어 개발자',
    compensation: '한국',
    description: '대구',
    technicalStack: 'NestJS',
    companyId: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 2,
    position: 'Django 백엔드 개발자',
    compensation: '한국',
    description: '원주',
    technicalStack: 'Django',
    companyId: 2,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 3,
    position: '프론트엔드 개발자',
    compensation: '한국',
    description: '부산',
    technicalStack: 'NextJS',
    companyId: 3,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 4,
    position: '백엔드 주니어 개발자',
    compensation: '한국',
    description: '전주',
    technicalStack: 'NestJS',
    companyId: 4,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 5,
    position: 'Vue 프론트 개발자',
    compensation: '한국',
    description: '서울',
    technicalStack: 'Vue',
    companyId: 5,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 6,
    position: '백엔드 주니어 개발자',
    compensation: '한국',
    description: '대구',
    technicalStack: 'NestJS',
    companyId: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 7,
    position: 'Django 백엔드 개발자',
    compensation: '한국',
    description: '원주',
    technicalStack: 'Django',
    companyId: 2,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 8,
    position: '프론트엔드 개발자',
    compensation: '한국',
    description: '부산',
    technicalStack: 'NextJS',
    companyId: 3,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 9,
    position: '백엔드 주니어 개발자랩',
    compensation: '한국',
    description: '전주',
    technicalStack: 'NestJS',
    companyId: 4,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 10,
    position: 'Vue 프론트 개발자',
    compensation: '한국',
    description: '서울',
    technicalStack: 'Vue',
    companyId: 5,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 11,
    position: '백엔드 주니어 개발자',
    compensation: '한국',
    description: '대구',
    technicalStack: 'NestJS',
    companyId: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 12,
    position: 'Django 백엔드 개발자',
    compensation: '한국',
    description: '원주',
    technicalStack: 'Django',
    companyId: 2,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 13,
    position: '프론트엔드 개발자',
    compensation: '한국',
    description: '부산',
    technicalStack: 'NextJS',
    companyId: 3,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 14,
    position: '백엔드 주니어 개발자',
    compensation: '한국',
    description: '전주',
    technicalStack: 'NestJS',
    companyId: 4,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 15,
    position: 'Vue 프론트 개발자',
    compensation: '한국',
    description: '서울',
    technicalStack: 'Vue',
    companyId: 5,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 16,
    position: '백엔드 주니어 개발자',
    compensation: '한국',
    description: '대구',
    technicalStack: 'NestJS',
    companyId: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 17,
    position: 'Django 백엔드 개발자',
    compensation: '한국',
    description: '원주',
    technicalStack: 'Django',
    companyId: 2,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 18,
    position: '프론트엔드 개발자',
    compensation: '한국',
    description: '부산',
    technicalStack: 'NextJS',
    companyId: 3,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 19,
    position: '백엔드 주니어 개발자',
    compensation: '한국',
    description: '전주',
    technicalStack: 'NestJS',
    companyId: 4,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 20,
    position: 'Vue 프론트 개발자',
    compensation: '한국',
    description: '서울',
    technicalStack: 'Vue',
    companyId: 5,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export class InitMock1696401301987 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager.save(User, userSeeds);
    await queryRunner.manager.save(Company, companySeeds);
    await queryRunner.manager.save(JobPosting, jobPostingSeeds);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await Promise.all(userSeeds.map(seed => queryRunner.manager.delete(User, { id: seed.id })));
    await Promise.all(companySeeds.map(seed => queryRunner.manager.delete(Company, { id: seed.id })));
    await Promise.all(jobPostingSeeds.map(seed => queryRunner.manager.delete(JobPosting, { id: seed.id })));
  }
}
