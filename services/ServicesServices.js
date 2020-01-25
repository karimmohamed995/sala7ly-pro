import DigestHelper from '../helpers/DigestHelper'
import HttpRequestHelper from '../helpers/HttpRequestHelper'
import Constants from '../services/Constants'


export default class ServicesServices{

    static getAllServices(callback){
    let uri = '/api/services';
    let headers = [];
    HttpRequestHelper.sendRequest(
      `${Constants.serverUrl}${uri}`,
      headers,
      false,
      'GET',
      callback,
    );
    }
}