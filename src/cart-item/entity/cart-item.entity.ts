import { Cart } from 'src/cart/entity/cart.entity';
import { Product } from 'src/product/entities/product.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  JoinColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  ManyToOne,
} from 'typeorm';

@Entity({ name: 'cart-item' })
export class CartItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  quantity: number;

  @Column()
  productId: number;

  @Column()
  cartId: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToOne(() => Product, (product) => product.id)
  @JoinColumn()
  product: Product;

  @ManyToOne(() => Cart, (cart) => cart.id)
  @JoinColumn()
  cart: Cart;
}
