import { Messaging } from './messaging';

const createSut = () => {
  return new Messaging();
}

describe('Messaging', () => {
  it('Esperado o retorno de undefined', () => {
    const sut = createSut();
    expect(sut.sendMessage('Teste')).toBeUndefined();
  });

  it('Esperado que a função console.log é chamado uma vez', () => {
    const sut = createSut();
    const consoleSpy = jest.spyOn(console, 'log');
    sut.sendMessage('Teste');
    expect(consoleSpy).toHaveBeenCalledTimes(1);
  });

  it('esperado que console.log seja chamado com "Mensgem enviada!: e msg"', () => {
    const sut = createSut();
    const consoleSpy = jest.spyOn(console, 'log');
    sut.sendMessage("Teste");
    expect(consoleSpy).toHaveBeenCalledWith('Mensagem enviada!', 'Teste');
  });
});
