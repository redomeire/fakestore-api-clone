import {
  Body,
  Controller,
  Delete,
  Param,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { CartItemService } from './cart-item.service';
import { AuthGuard } from 'src/auth/auth.guard';

@UseGuards(AuthGuard)
@Controller('cart-item')
export class CartItemController {
  constructor(private readonly cartItemService: CartItemService) {}

  @Post()
  create(
    @Request() req,
    @Body() body: { quantity: number; productId: number },
  ) {
    const token = req.headers.authorization.replace('Bearer ', '');
    return this.cartItemService.create(token, body.quantity, body.productId);
  }

  @Put(':id')
  update(@Param() param: { id: number }, @Body() body: { quantity: number }) {
    return this.cartItemService.updateById(param.id, body.quantity);
  }

  @Delete(':id')
  deleteById(@Param() param: { id: number }) {
    return this.cartItemService.deleteById(param.id);
  }
}
