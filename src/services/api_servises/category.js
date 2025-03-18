import Request from "../Request";
import NetworkCall from "../NetworkCall";
import K from "../../constants";
import { message } from "antd";
import { handleAPIError } from "../../utils/generalUtility";

export default class Category {
  static async getCategoryList() {
    try {
      const request = new Request(
        K.CATEGORIES.GET_ALL,
        K.HTTP_METHODS.GET,
        {},
        K.RESPONSE_TYPES.JSON,
      );

      const res = await NetworkCall.fetch(request);

      return res?.data || [];
    } catch (error) {
      handleAPIError(error);
      message.error(error);
    }
  }

  static async createNewTask(body) {
    try {
      const request = new Request(
        K.CATEGORIES.CREATE,
        K.HTTP_METHODS.POST,
        body,
        K.RESPONSE_TYPES.JSON,
      );

      const res = await NetworkCall.fetch(request);

      return res?.data || [];
    } catch (error) {
      handleAPIError(error);
      message.error(error);
    }
  }

  static async deleteCategory(payload) {
    try {
      const request = new Request(
        `${K.CATEGORIES.DELETE}/${payload.id}`,
        K.HTTP_METHODS.DELETE,
        undefined,
        K.RESPONSE_TYPES.JSON,
      );

      const res = await NetworkCall.fetch(request);
      return res?.data || [];
    } catch (error) {
      handleAPIError(error);
      message.error(error.message || "Failed to delete task");
    }
  }
}
