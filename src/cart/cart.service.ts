import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cart } from './entity/cart.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { InsertCart } from './interfaces/insertCart.dto';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart)
    private cartRepository: Repository<Cart>,
    private jwtService: JwtService,
  ) {}

  async addToCart(token: string, carts: InsertCart[]): Promise<any> {
    const user = await this.jwtService.verify(token);

    const cartsWithUserId = carts.map((cartItem) => ({
      ...cartItem,
      userId: user.sub,
    }));

    return this.cartRepository.save(cartsWithUserId);
  }

  async getCart(token: string): Promise<Cart[]> {
    const user = await this.jwtService.verify(token);

    return this.cartRepository
      .createQueryBuilder('cart')
      .where('cart.userId = :userId', { userId: user.sub })
      .getMany();
  }

  async removeFromCart(id: string): Promise<any> {
    const deletedCartItem = await this.cartRepository.delete(id);

    return {
      status: 'success',
      cartItem: deletedCartItem,
    };
  }
}
