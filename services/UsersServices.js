import DigestHelper from '../helpers/DigestHelper';
import HttpRequestHelper from '../helpers/HttpRequestHelper';
import Constants from './Constants';

export default class UsersServices {
  static async getLoggedInUser(callback) {
    let uri = '/api/users';
    let header = await DigestHelper.GenerateDigest(uri, 'GET');
    let headers = [
      {
        key: 'Authorization',
        value: header,
      },
    ];
    HttpRequestHelper.sendRequest(
      `${Constants.serverUrl}${uri}`,
      headers,
      true,
      'GET',
      callback,
    );
  }
}
