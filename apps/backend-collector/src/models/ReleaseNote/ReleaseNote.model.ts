import {
  Entity,
  BaseEntity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('release_note')
export class ReleaseNote extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid', name: 'release_note_factory_id' })
  releaseNoteFactoryId: string;

  @Column({ type: 'varchar' })
  title: string;

  @Column({ type: 'timestamp' })
  date: Date;

  @Column({ type: 'varchar' })
  link: string;

  @Column({ type: 'varchar' })
  preview: string;

  @Column({ type: 'varchar' })
  legend: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;
}
