export class EmailInUseError extends Error {
  constructor() {
    super('Este e-mail já esta em uso');
    this.name = 'EmailInUseError';
  }
}
