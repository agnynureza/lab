import ClientEror from './client-error.js';

class NotFoundError extends ClientEror {
  constructor(message) {
    super(message, 404);
    this.name = 'NotFoundError';
  }  
};

export default NotFoundError;