import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { AuthGuard } from 'src/auth/auth.guard';

@UseGuards(AuthGuard)
@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get()
  getAllOrders(@Request() req) {
    const token = req.headers.authorization.replace('Bearer ', '');
    return this.orderService.getOrders(token);
  }

  @Get(':id')
  getOrderById(@Param() id: number) {
    return this.orderService.getOrderById(id);
  }

  @Post()
  createNewOrder(@Request() req, @Body() id: number) {
    const token = req.headers.authorization.replace('Bearer ', '');
    return this.orderService.create(id, token);
  }
}
