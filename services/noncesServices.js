import Constants from './constants';
import HttpRequestHelper from './../helpers/httpRequestHelper'
class NoncesServices {
    static async GetNonce(email){
        let url = `${Constants.serverUrl}/api/nonces`;
        let headers = [{
            key:"Authorization",
            value:`Digest emailOrPhone="${email}"`
        }];

        var response = HttpRequestHelper.Get(url,headers);
        console.log(response);

    }
    
}
export default NoncesServices;