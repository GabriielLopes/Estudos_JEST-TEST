import { IndividualCustomer, EnterpriseCustomer } from './customer';

const createIndivdualCostumer = (
  firstName: string,
  lastName: string,
  cpf: string,
): IndividualCustomer => {
  return new IndividualCustomer(firstName, lastName, cpf);
};

const createEnterpriseCustomer = (name: string, cnpj: string): EnterpriseCustomer => {
  return new EnterpriseCustomer(name, cnpj);
};

describe('IndividualCustomer', () => {
  it("Esperado que tenha a propriedade firstName, no valor de 'Gabriel'", () => {
    const sut = createIndivdualCostumer('Gabriel', 'Lopes', '444-444-444-44');
    expect(sut).toHaveProperty('firstName', 'Gabriel');
  });

  it("Esperado que tenha a propriedade lastName, no valor de 'Lopes'", () => {
    const sut = createIndivdualCostumer('Gabriel', 'Lopes', '444-444-444-44');
    expect(sut).toHaveProperty('lastName', 'Lopes');
  });

  it('Esperado que tenha a propriedade cpf, no valor de "444-444-444-44"', () => {
    const sut = createIndivdualCostumer('Gabriel', 'Lopes', '444-444-444-44');
    expect(sut).toHaveProperty('cpf', '444-444-444-44');
  });

  it('Esperado que retorne o firstName e lastName. "Gabriel" e "Lopes"', () => {
    const sut = createIndivdualCostumer('Gabriel', 'Lopes', '444-444-444-44');
    expect(sut.getName()).toBe('Gabriel Lopes');
  });

  it("Esperado que retorne o CPF. '444-444-444-44'", () => {
    const sut = createIndivdualCostumer('Gabriel', 'Lopes', '444-444-444-44');
    expect(sut.getIDN()).toBe("444-444-444-44");
  });
});

describe('EnterpriseCostumer', () => {
  it("Esperado que tenha a propriedade name, no valor de 'EmpresaX'", () => {
    const sut = createEnterpriseCustomer('EmpresaX', '11.111.111/0001-10');
    expect(sut).toHaveProperty('name', 'EmpresaX');
  });

  it('Esperado que tenha a propriedade cnpj, no valor de "11.111.111/0001-10"', () => {
    const sut = createEnterpriseCustomer('EmpresaX', '11.111.111/0001-10');
    expect(sut).toHaveProperty('cnpj', '11.111.111/0001-10');
  });

  it('Esperado que retorne o name. "EmpresaX"', () => {
    const sut = createEnterpriseCustomer('EmpresaX', '11.111.111/0001-10');
    expect(sut.getName()).toBe('EmpresaX');
  });

  it("Esperado que retorne o CNPJ. '11.111.111/0001-10'", () => {
    const sut = createEnterpriseCustomer('EmpresaX', '11.111.111/0001-10');
    expect(sut.getIDN()).toBe('11.111.111/0001-10');
  });
});

