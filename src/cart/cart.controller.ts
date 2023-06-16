import {
  Controller,
  Body,
  UseGuards,
  Request,
  Post,
  Get,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { InsertCart } from './interfaces/insertCart.dto';

@UseGuards(AuthGuard)
@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post()
  addToCart(@Request() req, @Body() carts: InsertCart[]): Promise<any> {
    const token = req.headers.authorization.replace('Bearer ', '');
    return this.cartService.addToCart(token, carts);
  }

  @Get()
  getCart(@Request() req): Promise<any> {
    const token = req.headers.authorization.replace('Bearer ', '');
    return this.cartService.getCart(token);
  }
}
