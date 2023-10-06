import { Expose } from 'class-transformer';

export class GetOneJobPostingMapper {
  @Expose()
  id: number;

  @Expose()
  position: string;

  @Expose()
  technicalStack: string;

  @Expose()
  compensation: number;

  @Expose()
  description: string;

  @Expose()
  companyId: number;

  @Expose()
  otherJobPostings: number[];

  constructor(data: any) {
    Object.assign(this, data);
  }
}
