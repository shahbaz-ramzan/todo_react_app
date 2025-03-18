const CONSTANTS = {
  API: {
    BASE_URL: import.meta.env.VITE_BASE_API_URL || "http://localhost:6001/api",
    TIMEOUT: 10000,
    MAX_RETRIES: 3, // Useful for retry logic
  },
  HTTP_METHODS: {
    GET: "GET",
    POST: "POST",
    PUT: "PUT",
    PATCH: "PATCH",
    DELETE: "DELETE",
  },
  STATUS_CODES: {
    SUCCESS: 200,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    SERVER_ERROR: 500,
  },
  HEADERS: {
    JSON: "application/json",
  },
  Auth: {
    Login: "auth/login",
    SignUp: "auth/register",
  },
  TASKS: {
    GET_ALL: "task",
    GET_ById: "task/get",
    CREATE: "task",
    UPDATE: "task/update",
    DELETE: "task/delete",
  },
 SUB_TASKS: {
    CREATE: "task",
    UPDATE: "task",
    DELETE: "task",
  },
  CATEGORIES: {
    GET_ALL: "category",
    CREATE: "category",
    DELETE: "category",
  },
  RESPONSE_TYPES: {
    JSON: "json",
    ARRAYBUFFER: "arraybuffer",
    DOCUMENT: "document",
    TEXT: "text",
    STREAM: "stream",
    BLOB: "blob", // Browser only
  },
};

export default CONSTANTS;
