import { Expose, Exclude } from 'class-transformer';
import { Company } from 'src/company/models/company.entity';

export class JobPostingMapper {
  @Expose()
  id: number;

  @Expose()
  position: string;

  @Expose()
  technicalStack: string;

  @Expose()
  compensation: number;

  @Exclude()
  private company: Company;

  @Expose()
  get companyId(): number {
    return this.company.id;
  }

  @Expose()
  get companyName(): string {
    return this.company.name;
  }

  @Expose()
  get country(): string {
    return this.company.country;
  }

  @Expose()
  get region(): string {
    return this.company.region;
  }

  constructor(data: any) {
    Object.assign(this, data);
  }
}
