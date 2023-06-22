import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entity/order.entity';
import { Repository } from 'typeorm';
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

  async getOrders(token: string): Promise<any> {
    const payload = await this.jwtService.verify(token);

    const foundOrders = await this.orderRepository.findBy({
      userId: payload.sub,
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
      order: foundOrder,
    };
  }

  async checkout() {
    return '';
  }
}
