import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ApplicationHistory } from './application-history.entity';
import { BadRequestException, InternalServerErrorException } from '@nestjs/common';

export class ApplicationHistoryDAO {
  constructor(
    @InjectRepository(ApplicationHistory) private readonly applicationHistoryRepository: Repository<ApplicationHistory>,
  ) {}

  async findOne(jobPostingId: number, userId: number) {
    return await this.applicationHistoryRepository
      .createQueryBuilder('AH')
      .where('AH.jobPostingId = :jobPostingId', { jobPostingId })
      .andWhere('AH.userId = :userId', { userId })
      .getOne();
  }

  async apply(jobPostingId: number, userId: number) {
    try {
      const history = await this.applicationHistoryRepository
        .createQueryBuilder()
        .insert()
        .values({ jobPostingId, userId })
        .execute();
      return history.identifiers[0];
    } catch (err) {
      if (err.sqlState !== '23000') {
        throw new InternalServerErrorException('알 수 없는 데이터 베이스 에러');
      }

      throw new BadRequestException('존재하지 않는 채용공고입니다.');
    }
  }
}
