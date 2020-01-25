import DigestHelper from '../helpers/DigestHelper'
import HttpRequestHelper from '../helpers/HttpRequestHelper'
import Constants from '../services/Constants'
import StorageHelper from '../helpers/StorageHelper'

export default class JobRequestsService{

    static async postJobRequest(body,callback){
      let uri = '/api/mapjobtotechnicians';
    let header = await DigestHelper.GenerateDigest(uri, 'POST');
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
      'POST',
      callback,
      body
    );
    }
}