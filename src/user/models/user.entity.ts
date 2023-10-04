import { SoftDeleteEntity } from '../../database/base.entity';
import { ApplicationHistory } from '../../job-posting/models/application-history.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity('user')
export class User extends SoftDeleteEntity {
  @Column({ unique: true, comment: '사용자 이메일', nullable: false })
  email: string;

  @OneToMany(type => ApplicationHistory, applicationHistory => applicationHistory.user, { cascade: true })
  applicationHistory: ApplicationHistory;
}
