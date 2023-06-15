import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'category' })
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}
