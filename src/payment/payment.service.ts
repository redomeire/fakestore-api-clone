import { Injectable } from '@nestjs/common';
import { MidtransClient } from 'midtrans-node-client';
import { User } from 'src/users/entities/user.entity';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class PaymentService {
  private midtransCore = new MidtransClient.CoreApi({
    isProduction: false,
    serverKey: process.env.MIDTRANS_SANDBOX_SERVER_KEY,
    clientKey: process.env.MIDTRANS_SANDBOX_CLIENT_KEY,
  });

  async checkout(
    products: { id: string; name: string; quantity: number; price: number }[],
    user: User,
  ) {
    let total = 0;

    products.forEach((item) => {
      total += item.price * item.quantity;
    });

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
    console.log(res);
    return res;
  }
}
