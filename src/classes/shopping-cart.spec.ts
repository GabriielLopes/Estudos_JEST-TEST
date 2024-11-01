import { Discount } from './discount';
import { ShoppingCart } from './shopping-cart';
import CartItem from './interfaces/cart-item';

const createSut = () => {
  const discountMock = createDiscountMock();
  const sut = new ShoppingCart(discountMock);
  return { sut, discountMock };
};

const createDiscountMock = () => {
  class DiscountMock extends Discount {}
  return new DiscountMock();
};

const createCartItemMock = (name: string, price: number): CartItem => {
  class CartItemMock implements CartItem {
    constructor(
      public name: string,
      public price: number,
    ) {}
  }
  return new CartItemMock(name, price);
};

const createSutWithProducts = () => {
  const { sut, discountMock } = createSut();
  sut.addItem(createCartItemMock('Camiseta', 175.1));
  sut.addItem(createCartItemMock('Tênis', 599.99));
  return { sut, discountMock };
};

describe('ShoppingCart', () => {
  it('Deverá ser um carrinho vazio se não for adicionado nenhum produto', () => {
    const { sut } = createSut();
    expect(sut.isEmpty()).toBe(true);
  });

  it('Esperado que o carrinho tenha 2 itens', () => {
    const { sut } = createSutWithProducts();
    expect(sut.items.length).toBe(2);
  });

  it('Deve testar o total e totalWithDiscount', () => {
    const { sut } = createSutWithProducts();
    expect(sut.total()).toBe(775.09);
    expect(sut.totalWithDiscount()).toBe(775.09);
  });

  it('Deve add produtos e limpar o carrinho', () => {
    const { sut } = createSutWithProducts();
    expect(sut.items.length).toBe(2);
    sut.clear();
    expect(sut.items.length).toBe(0);
    expect(sut.isEmpty()).toBe(true);
  });

  it('Deve remover um produto', () => {
    const { sut } = createSutWithProducts();
    expect(sut.items.length).toBe(2);
    sut.removeItem(1);
    expect(sut.items.length).toBe(1);
  })

  it('Deve chamar discount.calculate() quando totalWithDiscount é chamado', () => {
    const { sut, discountMock } = createSutWithProducts();
    const discountMockSpy = jest.spyOn(discountMock, 'calculate');
    sut.totalWithDiscount();
    expect(discountMockSpy).toHaveBeenCalledTimes(1);
  })

    it('Deve chamar discount.calculate(price) com total price quando totalWithDiscount é chamado', () => {
      const { sut, discountMock } = createSutWithProducts();
      const discountMockSpy = jest.spyOn(discountMock, 'calculate');
      sut.totalWithDiscount();
      expect(discountMockSpy).toHaveBeenCalledWith(sut.total());
    });
});
