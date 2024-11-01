import { Discount, FiftyPercentDiscount, TenPercentDiscount, NoDiscount } from './discount';

const createSut = (className: new () => Discount): Discount => {
  return new className();
};

describe('Discount', () => {
  it('Esperado não ter desconto', () => {
    const sut = createSut(NoDiscount);
    const price: number = 50.58;
    expect(sut.calculate(price)).toBe(price);
  });

  it('Esperado que o valor tenha 50% de desconto', () => {
    const sut = createSut(FiftyPercentDiscount);
    const price: number = 50.95;
    expect(sut.calculate(price)).toBe(price - (price * 50) / 100);
  });

  it('Esperado que o valor tenha 10% de desconto', () => {
    const sut = createSut(TenPercentDiscount);
    const price: number = 50.10;
    expect(sut.calculate(price)).toBe(price - (price * 10) / 100);
  });
});
