class ClientEror extends Error {
    constructor(message, statusCode = 400) {
        super(message);
        this.name = 'ClientEror';
        this.statusCode = statusCode;
    }
};

export default ClientEror;