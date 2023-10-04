import { CreateDateColumn, DeleteDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

// The default entity is hard-delete by default.
export class BaseEntity {
  @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true })
  id: number;

  @CreateDateColumn({ name: 'create-at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated-at' })
  updatedAt!: Date;
}

export class SoftDeleteEntity extends BaseEntity {
  @DeleteDateColumn({ name: 'deleted-at' })
  deletedAt?: Date | null;
}
