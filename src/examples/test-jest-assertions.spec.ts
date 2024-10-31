describe('Valores primitivos', () => {
  it('should test jest assertions', () => {
    const number = 10;

    expect(number).toBe(10);

    expect(number).not.toBeFalsy();
    expect(number).toBeTruthy();

    expect(number).toBeGreaterThan(9);
    expect(number).toBeGreaterThanOrEqual(10);

    expect(number).toBeLessThan(11);
    expect(number).toBeLessThanOrEqual(10);

    expect(number).toBeCloseTo(10.001);
    expect(number).toBeCloseTo(9.996);

    expect(number).not.toBeNull();

    expect(number).toHaveProperty('toString');
  });
});

describe('Objetos', () => {
  it('should jest assertions with objects', () => {
    const pessoa = { nome: 'Gabriel', idade: 25 };
    const outraPessoa = { ...pessoa };

    expect(pessoa).toEqual(outraPessoa); // um Objeto é igual ao outro objeto

    expect(pessoa).toHaveProperty('idade', 25); // Verifica se um objeto tem uma propriedade

    expect(pessoa.nome).toBe('Gabriel')

  });
});
