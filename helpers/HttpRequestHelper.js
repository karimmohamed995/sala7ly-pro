import DigestHelper from "./DigestHelper";

export default class HttpRequestHelper {
    static sendRequest = (url, headers, isAuthenticated,method,callback,data = null) =>{
        var xhr = new XMLHttpRequest();
        xhr.addEventListener("readystatechange", function () {
        if (this.readyState === 4) 
            HttpRequestHelper.handleResponse(this,callback,isAuthenticated);
        });
        xhr.open(method, url);
        HttpRequestHelper.setHeaders(headers,xhr);
        xhr.send(JSON.stringify(data));
    }
    
    static handleResponse(response,callback,isAuthenticated){
        if(isAuthenticated){
            let header = response.getResponseHeader('www-authenticate');
            DigestHelper.SetNonce(header);
        }

        callback(response);
    }


    static setHeaders(headers,xhr){
        headers.forEach(header => {
            xhr.setRequestHeader(header.key,header.value);
            });
            xhr.responseType = 'json';
        xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    }
}