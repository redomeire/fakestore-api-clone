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

@Module({
  imports: [
    ProductModule,
    AuthModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3308,
      username: 'root',
      password: 'admin',
      database: 'fakestore-api',
      entities: [Product, User, Profile, Category],
      synchronize: true,
    }),
    ProfileModule,
    CategoryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
