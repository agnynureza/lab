import ClientEror from "./client-error.js";

class InvariantError extends ClientEror {
    constructor(message) {
        super(message);
        this.name = 'InvariantError';
    }
};

export default InvariantError;