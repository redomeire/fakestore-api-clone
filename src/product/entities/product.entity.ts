import { Category } from 'src/category/entity/category.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity({ name: 'product' })
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  price: number;

  @Column()
  description: string;

  @Column()
  image: string;

  @Column()
  stock: number;

  @ManyToOne(() => Category, (category) => category.id)
  @JoinColumn()
  category: Category;
}
