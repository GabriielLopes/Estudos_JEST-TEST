import { Order } from './order';
import { ShoppingCart } from './shopping-cart';
import { Discount } from './discount';
import { IndividualCustomer } from './customer';
import { Messaging } from '../services/messaging';
import { Persistency } from '../services/persistency';

const createDiscountMock = () => {
  class DiscountMock extends Discount {}
  return new DiscountMock();
};

const createCartMock = () => {
  const discountMock = createDiscountMock();
  const shoppingCartMock = new ShoppingCart(discountMock);
  return { shoppingCartMock, discountMock };
};

const createIndivdualCostumer = (
  firstName: string,
  lastName: string,
  cpf: string,
): IndividualCustomer => {
  return new IndividualCustomer(firstName, lastName, cpf);
};

const createMessagingMock = () => {
  const messaging = new Messaging();
  return messaging;
};

const createPersistencyMock = () => {
  const persistency = new Persistency();
  return persistency;
};

const createOrderMock = () => {
  const { shoppingCartMock } = createCartMock();
  const individualCustomerMock = createIndivdualCostumer('Gabriel', 'Lopes', '444-444-444-44');
  const messagingMock = createMessagingMock();
  const persistencyMock = createPersistencyMock();
  const sut = new Order(shoppingCartMock, individualCustomerMock, messagingMock, persistencyMock);

  return { shoppingCartMock, individualCustomerMock, messagingMock, persistencyMock, sut };
};

describe('Order', () => {
  it('Deve verificar se o carrinho está vazio antes de fechar o carrinho', () => {
    const { sut, shoppingCartMock } = createOrderMock();
    const shoppingCartMockSpy = jest.spyOn(shoppingCartMock, 'isEmpty');
    sut.checkOut();
    expect(shoppingCartMockSpy).toHaveBeenCalledTimes(1);
    expect(sut.orderStatus).toBe('Open');
  });

  it('Deve verificar se o carrinho não está vazio antes de fechar o carrinho', () => {
    const { sut, shoppingCartMock } = createOrderMock();
    const shoppingCartMockSpy = jest.spyOn(shoppingCartMock, 'isEmpty').mockReturnValue(false);
    sut.checkOut();
    expect(shoppingCartMockSpy).toHaveBeenCalledTimes(1);
    expect(sut.orderStatus).toBe('Closed');
  });

  it('Deve enviar o e-mail para o cliente', () => {
    const { sut, messagingMock, shoppingCartMock } = createOrderMock();
    jest.spyOn(shoppingCartMock, 'isEmpty').mockReturnValue(false);
    const messagingMockSpy = jest.spyOn(messagingMock, 'sendMessage');
    sut.checkOut();
    expect(messagingMockSpy).toHaveBeenCalledTimes(1);
  });

  it('Deve salvar a order', () => {
    const { sut, persistencyMock, shoppingCartMock } = createOrderMock();
    jest.spyOn(shoppingCartMock, 'isEmpty').mockReturnValue(false);
    const persistencyMockSpy = jest.spyOn(persistencyMock, 'saveOrder');
    sut.checkOut();
    expect(persistencyMockSpy).toHaveBeenCalledTimes(1);
  });

  it("A orderStatus deve começar como 'open'", () => {
    const { sut } = createOrderMock();
    expect(sut).toHaveProperty('orderStatus', 'Open');
  });
});
