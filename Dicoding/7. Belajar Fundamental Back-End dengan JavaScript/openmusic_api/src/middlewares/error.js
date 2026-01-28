import response from "../utils/response.js";
import { ClientError } from "../exceptions/index.js";

const errorHandler = (err, req, res, next) => {
  if (err.code === "LIMIT_FILE_SIZE") {
    return response(res, 413, "Berkas terlalu besar", null); 
  }

  // handle client error and its subclasses
  if (err instanceof ClientError) {
    return response(res, err.statusCode, err.message, null);
  }

  // handle joi validation errors
  if (err.isJoi) {
    return response(res, 400, err.details[0].message, null);
  }

  const status = err.statusCode || err.status || 500;
  const message = err.message || "Internal Server Error";

  console.error("Unhandled Error:", err);
  return response(res, status, message, null);
};

export default errorHandler;
