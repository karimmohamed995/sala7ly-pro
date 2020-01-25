import Constants from './Constants';
import HttpRequestHelper from '../helpers/HttpRequestHelper';

export default class NoncesServices {
  static async GetNonce(email, callback) {
    let url = `${Constants.serverUrl}/api/nonces`;
    let headers = [
      {
        key: 'Authorization',
        value: `Digest emailOrPhone="${email}"`,
      },
    ];
    HttpRequestHelper.sendRequest(url, headers, true, 'GET', callback);
  }
}
