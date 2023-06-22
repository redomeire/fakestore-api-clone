import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CartItem } from './entity/cart-item.entity';
import { Repository } from 'typeorm';
import { Cart } from 'src/cart/entity/cart.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class CartItemService {
  constructor(
    @InjectRepository(CartItem)
    private cartItemRepository: Repository<CartItem>,
    @InjectRepository(Cart)
    private cartRepository: Repository<Cart>,
    private jwtService: JwtService,
  ) {}
  async create(token: string, quantity: number, productId: number) {
    const payload = await this.jwtService.verify(token);

    const foundCart = await this.cartRepository.findOneBy({
      userId: payload.sub,
    });

    if (foundCart === null) {
      const newCart = this.cartRepository.create({
        userId: payload.sub,
      });

      await this.cartRepository.save(newCart);

      const newCartItem = this.cartItemRepository.create({
        quantity,
        productId,
        cartId: newCart.id,
      });

      await this.cartItemRepository.save(newCartItem);

      return {
        status: 'success',
        message: 'success add item to cart',
        data: newCartItem,
      };
    }

    const newCartItem = this.cartItemRepository.create({
      quantity,
      productId,
      cartId: foundCart.id,
    });

    await this.cartItemRepository.save(newCartItem);

    return {
      status: 'success',
      message: 'success add item to cart',
      data: newCartItem,
    };
  }

  async updateById(id: number, quantity: number) {
    const foundCartItem = await this.cartItemRepository.findOneBy({ id });

    if (foundCartItem === null)
      return {
        status: 'error',
        message: 'cart not found',
      };

    foundCartItem.quantity = quantity;
    await this.cartItemRepository.save(foundCartItem);

    return {
      status: 'success',
      message: 'success updating cart',
      data: foundCartItem,
    };
  }

  async deleteById(id: number) {
    const foundCartItem = await this.cartItemRepository.findOneBy({ id });

    if (foundCartItem === null)
      return {
        status: 'error',
        message: 'cart item not found',
      };

    await this.cartItemRepository.delete({
      id,
    });

    const foundCartItems = await this.cartItemRepository.find({
      where: {
        cartId: foundCartItem.cartId,
      },
    });

    if (foundCartItems.length === 0) {
      await this.cartRepository.delete({ id: foundCartItem.cartId });
    }

    return {
      status: 'success',
      message: 'success delete cart item',
      data: foundCartItem,
    };
  }
}
