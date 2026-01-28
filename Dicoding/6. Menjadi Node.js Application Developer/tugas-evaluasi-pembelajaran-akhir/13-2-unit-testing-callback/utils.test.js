const { generateRandomString } = require('./utils');

describe('generateRandomString', () => {
    test('should generate a random string of the specified length', (done) => {
        const length = 10;
        generateRandomString(length, (err, randomString) => {
        expect(randomString).toHaveLength(length);
        done();
        });
    });
    test('should return an error if length is not a number', (done) => {
        const length = 'ten';
        generateRandomString(length, (err, randomString) => {
            expect(err).toBeInstanceOf(Error);
            expect(err.message).toBe('Length must be a number');
            done();
        });
    });
    test('should return an error if length is less than 1', (done) => {
        const length = 0;
        generateRandomString(length, (err, randomString) => {
            expect(err).toBeInstanceOf(Error);
            expect(err.message).toBe('Length must be greater than 0');
            done();
        });
    });
});