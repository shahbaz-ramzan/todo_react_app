import Request from "../Request";
import NetworkCall from "../NetworkCall";
import K from "../../constants";
import { message } from "antd";
import { handleAPIError, setToken } from "../../utils/generalUtility";

export default class User {
  static async loginCall(body) {
    try {
      const request = new Request(
        K.Auth.Login,
        K.HTTP_METHODS.POST,
        body,
        K.RESPONSE_TYPES.JSON,
      );

      const res = await NetworkCall.fetch(request);
      if (res?.status == 200) {
        message.success(res?.data?.message || "Login successful!");
        setToken(res?.data?.token);
        return res;
      }
    } catch (error) {
      console.error("Login API Error:", error);
      message.error(error);
    }
  }

  static async registerUserCall(body) {
    try {
      const request = new Request(
        K.Auth.SignUp,
        K.HTTP_METHODS.POST,
        body,
        K.RESPONSE_TYPES.JSON,
      );
      return await NetworkCall.fetch(request);
    } catch (error) {
      handleAPIError(error);
    }
  }
}
