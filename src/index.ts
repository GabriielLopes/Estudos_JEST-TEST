/*
Depedency Inversion Principle

Principio da inversão de dependencia

Classes de baixo nível são classes que executam tarefas (os detalhes).
Classes de alto nível são classes que gerenciam as classes de baixo nível.

*/

import { IndividualCustomer } from './classes/customer';
import { FiftyPercentDiscount, NoDiscount, TenPercentDiscount } from './classes/discount';
import { Order } from './classes/order';
import { Product } from './classes/product';
import { ShoppingCart } from './classes/shopping-cart';
import { Messaging } from './services/messaging';
import { Persistency } from './services/persistency';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const fiftyPercentDiscount = new FiftyPercentDiscount();

const tenPercentDiscount = new TenPercentDiscount();
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const noDiscount = new NoDiscount();
const shoppingCart = new ShoppingCart(tenPercentDiscount);
const individualCustomer = new IndividualCustomer('Gabriel', 'Lopes', '444.444.444-44');
const messaging = new Messaging();
const persistency = new Persistency();
const order = new Order(shoppingCart, individualCustomer, messaging, persistency);

shoppingCart.addItem(new Product('Camisa', 55.9));

shoppingCart.addItem(new Product('Calça', 99.9));

shoppingCart.addItem(new Product('Boné', 53.9));

console.log(order.orderStatus);
console.log(shoppingCart.items);
console.log(shoppingCart.total());
console.log(shoppingCart.totalWithDiscount());
order.checkOut();
console.log(order.orderStatus);
