import axios from "axios";
import { message } from "antd";
import { trackPromise } from "react-promise-tracker";
import K from "../constants";
import { handleAPIError, removeToken } from "../utils/generalUtility";

class NetworkCall {
  static axiosInstance = axios.create({
    baseURL: K.API.BASE_URL,
    timeout: K.API.TIMEOUT,
  });

  static async fetch(request, showLoading = true) {
    try {
      const axiosConfig = {
        method: request.method,
        url: request.url,
        data: request.body,
        headers: request.headers,
        responseType: request.responseType,
      };

      const response = await (showLoading
        ? trackPromise(NetworkCall.axiosInstance(axiosConfig))
        : NetworkCall.axiosInstance(axiosConfig));

      return { data: response?.data, status: response?.status, error: null };
    } catch (error) {
      const err = handleAPIError(error);

      // Handle 401 Unauthorized
      if (error.response?.status === K.STATUS_CODES.UNAUTHORIZED) {
        message.error("Session expired. Please log in again.");
        removeToken(); // Clear stored token
        window.location.href = "/login"; // Redirect to login
        return Promise.reject(err);
      }

      message.error(err.message || "An error occurred.");

      return Promise.reject(err);
    }
  }
}

export default NetworkCall;
