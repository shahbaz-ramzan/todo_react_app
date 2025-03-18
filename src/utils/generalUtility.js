import { message } from "antd";
import Cookies from "js-cookie";

const TOKEN_KEY = "login_token";

// Set token in cookies with 7-day expiry
export const setToken = async (token) => {
  if (!token) return;
  Cookies.set(TOKEN_KEY, token, {
    expires: 7,
    secure: true,
    sameSite: "Strict",
  });
};

// Get token from cookies
export const getToken = () => {
  return Cookies.get(TOKEN_KEY) || "";
};

// Remove token from cookies
export const removeToken = () => {
  Cookies.remove(TOKEN_KEY);
};

export const handleAPIError = (error) => {
  console.error("API Error:", error);

  if (!error.response) {
    const networkErrorMsg = "Network error. Please check your connection.";
    message.error(networkErrorMsg);
    return { message: networkErrorMsg };
  }

  const { status, data } = error.response;
  const errorMessage = data?.message || "An unexpected error occurred.";

  message.error(errorMessage);

  return { status, message: errorMessage };
};

export const formatTaskData = (tasks = []) => {
  return tasks.reduce(
    (acc, task) => {
      const status = task?.status?.toLowerCase() || "todo";
      if (!acc[status]) acc[status] = [];

      const createdAt = task?.createdAt ? new Date(task.createdAt) : new Date();
      const formattedDate = createdAt.toLocaleDateString("en-US");
      const formattedTime = createdAt.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });

      acc[status].push({
        id: task._id,
        title: task.title,
        description: task.description || "No description available",
        status,
        date: formattedDate,
        time: formattedTime,
      });
      return acc;
    },
    { backlog: [], todo: [], inprogress: [], done: [], closed: [] }
  );
};
