import { CreateDateColumn, DeleteDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

// The default entity is hard-delete by default.
export class BaseEntity {
  @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true })
  id: number;

  @CreateDateColumn({ name: 'create-at', select: false })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated-at', select: false })
  updatedAt!: Date;
}

export class SoftDeleteEntity extends BaseEntity {
  @DeleteDateColumn({ name: 'deleted-at', select: false })
  deletedAt?: Date | null;
}
