import { Module } from '@nestjs/common';
import { CartItemService } from './cart-item.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartItem } from './entity/cart-item.entity';
import { CartItemController } from './cart-item.controller';
import { Cart } from 'src/cart/entity/cart.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CartItem, Cart])],
  providers: [CartItemService],
  controllers: [CartItemController],
})
export class CartItemModule {}
