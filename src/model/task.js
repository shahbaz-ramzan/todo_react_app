import { setCategoryList, setTasks } from "../features/tasks/taskSlice";
import Category from "../services/api_servises/category";
import Todo from "../services/api_servises/todo";
import { formatTaskData } from "../utils/generalUtility";

export const fetchFormattedData = async (dispatch) => {
  try {
    const response = await Todo?.getListData();
    if (response?.data) {
      const formattedTasks = formatTaskData(response?.data);
      dispatch(setTasks(formattedTasks));
      return formattedTasks;
    }
  } catch (error) {
    console.error("Error fetching tasks:", error);
  }
};

export const getCategoryList = async (dispatch) => {
  try {
    const response = await Category?.getCategoryList();
    if (response?.data) {
      dispatch(setCategoryList(response?.data));
      return response?.data;
    }
  } catch (error) {
    console.error("Error fetching tasks:", error);
  }
};
