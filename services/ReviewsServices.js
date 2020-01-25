import DigestHelper from '../helpers/DigestHelper';
import HttpRequestHelper from '../helpers/HttpRequestHelper';
import Constants from './Constants';

export default class ReviewsServices {
  static async updateReview(reviewId, body, callback) {
    let uri = `/api/reviews/${reviewId}`;
    let header = await DigestHelper.GenerateDigest(uri, 'PATCH');
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
      'PATCH',
      callback,
      body,
    );
  }
}
