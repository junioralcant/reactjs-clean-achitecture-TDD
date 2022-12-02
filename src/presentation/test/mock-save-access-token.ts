import {ISaveAccessToken} from '../../domain/useCases/save-access-token';

export class SaveAccessTokenMock implements ISaveAccessToken {
  accesssToken?: string;

  async save(accessToken?: string): Promise<void> {
    this.accesssToken = accessToken;
  }
}
