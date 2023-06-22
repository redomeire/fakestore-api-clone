import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entity/order.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
    private jwtService: JwtService,
  ) {}

  async create(id: number, token: string): Promise<any> {
    const payload = await this.jwtService.verify(token);

    const newOrder = this.orderRepository.create({
      cartId: id,
      userId: payload.sub,
    });

    await this.orderRepository.save(newOrder);

    return {
      status: 'success',
      message: 'success creating new order',
      order: newOrder,
    };
  }

  async getOrders(user: User): Promise<any> {
    const foundOrders = await this.orderRepository.findBy({
      user,
    });

    return {
      status: 'success',
      message: 'success get all orders',
      orders: foundOrders,
    };
  }

  async getOrderById(id: number): Promise<any> {
    const foundOrder = await this.orderRepository.findOneBy({ id });

    return {
      status: 'success',
      message: 'success get order',
      orders: foundOrder,
    };
  }

  async checkout() {
    return '';
  }
}
