const response = (res, statusCode, message, data,  customHeaders = {}) => {
  Object.entries(customHeaders).forEach(([key, value]) => {
    res.setHeader(key, value);
  });
  
  return res.status(statusCode).json({
    status: statusCode < 400 ? 'success': 'fail',
    code: statusCode,
    message,
    data,
  }).end();
};

export default response;