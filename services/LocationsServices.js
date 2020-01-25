import Constants from './Constants';
import HttpRequestHelper from '../helpers/HttpRequestHelper';
import DigestHelper from '../helpers/DigestHelper';


export default class LocationsServices {
  static async GetLocationName(lat, long,callback) {
    let uri = '/api/locations';
    let header = await DigestHelper.GenerateDigest(uri, 'GET');
    let headers = [
      {
        key: 'Authorization',
        value: header,
      },
    ];
    HttpRequestHelper.sendRequest(
      `${Constants.serverUrl}${uri}?latitude=${lat}&longitude=${long}`,
      headers,
      true,
      'GET',
      callback,
    );
  }
}
