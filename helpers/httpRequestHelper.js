export default class HttpRequestHelper {
    static Get = (url, headers) =>{
        var data = null;
    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function () {
    if (this.readyState === 4) {
        return this
    }
    });

    xhr.open("GET", url);
    headers.forEach(header => {
    xhr.setRequestHeader(header.key,header.value);
    });
    xhr.send(data);
    }

    Post = (url,data, headers) =>{//TODO
        var data = null;
    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function () {
    if (this.readyState === 4) {
        return this
    }
    });

    xhr.open("GET", url);
    headers.forEach(header => {
    xhr.setRequestHeader(header.key,header.value);
    });
    xhr.send(data);
    }
}