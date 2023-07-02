import { Injectable } from '@nestjs/common';
import { MidtransClient } from 'midtrans-node-client';
import { ProductService } from 'src/product/product.service';
import { User } from 'src/users/entities/user.entity';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class PaymentService {
  constructor(private productService: ProductService) {}

  private midtransCore = new MidtransClient.CoreApi({
    isProduction: false,
    serverKey: process.env.MIDTRANS_SANDBOX_SERVER_KEY,
    clientKey: process.env.MIDTRANS_SANDBOX_CLIENT_KEY,
  });

  async placeOrder(
    products: { id: string; name: string; quantity: number; price: number }[],
    user: User,
  ) {
    let total = 0;

    products.forEach((item) => {
      total += item.price * item.quantity;
    });

    try {
      const res = await this.midtransCore
        .charge({
          payment_type: 'gopay',
          transaction_details: {
            order_id: `order-${uuidv4()}`,
            gross_amount: total,
          },
          item_details: products,
          customer_details: {
            first_name: user.name,
            email: user.email,
          },
        })
        .then((result) => {
          console.log(result);
          return result;
        })
        .catch((err) => {
          console.log(err.message);
        });

      return res;
    } catch (error) {
      console.log(error);
    } finally {
      products.forEach(async (item) => {
        console.log(item);
        await this.productService.decreaseAmount(
          parseInt(item.id),
          item.quantity,
        );
      });
    }
  }
}
