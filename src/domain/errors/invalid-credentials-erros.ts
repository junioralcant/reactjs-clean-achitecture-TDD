export class InvalidCredentilsError extends Error {
  constructor() {
    super('Credentciais inválidas');
    this.name = 'InvalidCredentilsError';
  }
}
