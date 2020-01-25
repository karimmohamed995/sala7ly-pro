import DigestHelper from '../helpers/DigestHelper'
import HttpRequestHelper from '../helpers/HttpRequestHelper'
import Constants from '../services/Constants'
import StorageHelper from '../helpers/StorageHelper'

export default class JobsServices{

    static async getAllJobs(callback){
    let uri = '/api/jobs';
    let header = await DigestHelper.GenerateDigest(uri, 'GET');
    let headers = [
      {
        key: 'Authorization',
        value: header,
      },
    ];
    let clientId = (await StorageHelper.getUser()).Id
    HttpRequestHelper.sendRequest(
      `${Constants.serverUrl}${uri}?clientId=${clientId}`,
      headers,
      true,
      'GET',
      callback,
    );
    }

    static async postJob(body,callback){
      let uri = '/api/jobs';
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