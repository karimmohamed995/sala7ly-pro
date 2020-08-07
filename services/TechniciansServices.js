import HttpRequestHelper from '../helpers/HttpRequestHelper';
import Constants from './Constants';
import StorageHelper from '../helpers/StorageHelper'
import DigestHelper from '../helpers/DigestHelper'

export default class TechniciansServices {
  static async postTechnician(data, callback) {
    let uri = '/api/technicians';
    let url = `${Constants.serverUrl}${uri}`;
    let method = 'POST';
    let headers = [];
    HttpRequestHelper.sendRequest(url, headers, false, method, callback, data);
  }

  static async patchTechnician(id,data, callback) {
    let uri = `/api/technicians/${id}`;
    let url = `${Constants.serverUrl}${uri}`;
    let header = await DigestHelper.GenerateDigest(uri, 'PATCH');
    let headers = [
      {
        key: 'Authorization',
        value: header,
      },
    ];
    let method = 'PATCH';
    HttpRequestHelper.sendRequest(url, headers, true, method, callback,data);
  }


  static async GetTechnicianWithId(id, callback) {
    let uri = `/api/technicians/${id}`;
    let url = `${Constants.serverUrl}${uri}`;
    let header = await DigestHelper.GenerateDigest(uri, 'GET');
    let headers = [
      {
        key: 'Authorization',
        value: header,
      },
    ];
    let method = 'GET';
    HttpRequestHelper.sendRequest(url, headers, true, method, callback);
  }
}
