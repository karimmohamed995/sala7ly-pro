import HttpRequestHelper from '../helpers/HttpRequestHelper';
import Constants from './Constants';

export default class TechniciansServices {
  static async postTechnician(data, callback) {
    let uri = '/api/technicians';
    let url = `${Constants.serverUrl}${uri}`;
    let method = 'POST';
    let headers = [];
    HttpRequestHelper.sendRequest(url, headers, false, method, callback, data);
  }
}
