export class UnexpectedError extends Error {
  constructor() {
    super('Algo de errado acontecue, Tente novamente mais tarde');
    this.name = 'UnexpectedError';
  }
}
