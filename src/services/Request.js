import K from "../constants";
import { getToken } from "../utils/generalUtility";

export default class Request {
  constructor(
    endpoint,
    method = K.HTTP_METHODS.GET,
    body = {},
    customHeaders = {},
    responseType = K.RESPONSE_TYPES.JSON,
  ) {
    this.url = `${K.API.BASE_URL}${endpoint}`;
    this.method = method;
    this.body = ["POST", "PUT", "PATCH"].includes(method)
      ? JSON.stringify(body)
      : {};

    const token = getToken();
    const authHeader = token ? { Authorization: `Bearer ${token}` } : {};
    this.responseType = responseType;

    this.headers = {
      "Content-Type": K.HEADERS.JSON,
      ...authHeader,
      ...customHeaders,
    };
  }
}
