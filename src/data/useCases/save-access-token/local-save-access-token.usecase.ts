import {ISaveAccessToken} from '../../../domain/useCases/save-access-token';
import {ISetStorage} from '../../protocols/cache/set-storage';

export class LocalSaveAccessTokenUseCase implements ISaveAccessToken {
  constructor(private readonly setStorage: ISetStorage) {}

  async save(accessToken: string): Promise<void> {
    this.setStorage.set('accessToken', accessToken);
  }
}
