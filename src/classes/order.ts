import { OrderStatus } from './interfaces/order-status';
import { CustomerOrder } from './interfaces/customer-protocol';
import { ShoppingCartProtocol } from './interfaces/shopping-cart-protocol';
import { MessagingProtocol } from './interfaces/messaging-protocol';
import { PersistencyProtocol } from './interfaces/persistency-protocol';

export class Order {
  private _orderStatus: OrderStatus = 'Open';

  constructor(
    private readonly cart: ShoppingCartProtocol,
    private readonly customer: CustomerOrder,
    private readonly messaging: MessagingProtocol,
    private readonly persistency: PersistencyProtocol,
  ) {}

  get orderStatus(): OrderStatus {
    return this._orderStatus;
  }

  checkOut(): void {
    if (this.cart.isEmpty()) {
      console.log('Seu carrinho está vazio!');
      return;
    }

    this.messaging.sendMessage(
      `Seu pedido de valor ${this.cart.totalWithDiscount()} foi fechado e está pendente de pagamento!`,
    );

    this._orderStatus = 'Closed';
    this.persistency.saveOrder();
    this.cart.clear();
    console.log('O cliente é', this.customer.getName(), this.customer.getIDN());
  }
}
