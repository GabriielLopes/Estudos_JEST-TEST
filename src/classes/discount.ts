export abstract class Discount {
  protected discount = 0;

  calculate(price: number): number {
    return price - (price * this.discount/100);
  }
}

export class FiftyPercentDiscount extends Discount {
  protected readonly discount: number = 50

}

export class TenPercentDiscount extends Discount {
  protected readonly discount: number = 10;
}

// Aqui estamos quebrando a violação de LISKOV
export class NoDiscount extends Discount {}
