import { Product } from "./product";

const createSut = (name: string, price: number) => {
  return new Product(name, price);
};

describe("Product", () => {
  it("Esperado que SUT tenha a propriedade name, com o valor de 'Camisa'", () => {
    const sut = createSut("Camisa", 25);
    expect(sut).toHaveProperty('name', 'Camisa');
  })

  it("Esperado que o SUT tenha a propriedade Price, com o valor de '25' number", () => {
    const sut = createSut("Camisa", 25);
    expect(sut).toHaveProperty('price', 25);
  })
})
