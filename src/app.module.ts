import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './product/product.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './product/entities/product.entity';
import { AuthModule } from './auth/auth.module';
import { User } from './users/entities/user.entity';
import { ProfileModule } from './profile/profile.module';
import { Profile } from './profile/entities/profile.entity';
import { CategoryModule } from './category/category.module';
import { Category } from './category/entity/category.entity';
import { ConfigModule } from '@nestjs/config';
import { CartModule } from './cart/cart.module';
import { Cart } from './cart/entity/cart.entity';
import { OrderModule } from './order/order.module';
import { Order } from './order/entity/order.entity';
import { CartItemModule } from './cart-item/cart-item.module';
import { CartItem } from './cart-item/entity/cart-item.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [Product, User, Profile, Category, Cart, Order, CartItem],
      synchronize: true,
    }),
    ProductModule,
    AuthModule,
    ProfileModule,
    CategoryModule,
    CartModule,
    OrderModule,
    CartItemModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
