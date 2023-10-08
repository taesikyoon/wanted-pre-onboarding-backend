import { Expose } from 'class-transformer';

export class UpdatedJobPostingMapper {
  @Expose()
  id: number;

  @Expose()
  position: string;

  @Expose()
  technicalStack: string;

  @Expose()
  description: string;

  @Expose()
  companyId: number;

  constructor(data: any) {
    Object.assign(this, data);
  }
}
