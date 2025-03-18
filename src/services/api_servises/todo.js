import Request from "../Request";
import NetworkCall from "../NetworkCall";
import K from "../../constants";
import { message } from "antd";
import { handleAPIError } from "../../utils/generalUtility";

export default class Todo {
  static async getListData() {
    try {
      const request = new Request(
        K.TASKS.GET_ALL,
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

  static async updateTask(body) {
    try {
      const request = new Request(
        `${K.TASKS.UPDATE}/${body?.id}`,
        K.HTTP_METHODS.PUT,
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

  static async createNewTask(body) {
    try {
      const request = new Request(
        K.TASKS.CREATE,
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

  static async deleteTask(payload) {
    try {
      const request = new Request(
        `${K.TASKS.DELETE}/${payload.id}`,
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

  static async getTaskById(payload) {
    try {
      const request = new Request(
        `${K.TASKS.GET_ById}/${payload.id}`,
        K.HTTP_METHODS.GET,
        {},
        K.RESPONSE_TYPES.JSON,
      );

      const res = await NetworkCall.fetch(request);
      return res?.data || [];
    } catch (error) {
      handleAPIError(error);
      message.error(error.message || "Failed to delete task");
    }
  }

  // sub Task API
  static async createSubTask(body) {
    try {
      const request = new Request(
        `${K.SUB_TASKS.CREATE}/${body.id}/subtask`,
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
}
