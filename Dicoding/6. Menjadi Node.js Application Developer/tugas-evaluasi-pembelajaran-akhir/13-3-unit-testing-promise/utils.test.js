const { generateRandomStringProm } = require('./utils');

describe('generateRandomStringProm', () => {
    test('generates a string of the correct length', async () => {
        const length = 10;
        const result = await generateRandomStringProm(length);
        expect(result).toHaveLength(length);
    });
    test('rejects when length is not a number', async () => {
        await expect(generateRandomStringProm('ten')).rejects.toThrow("Length must be a number");
    });
    test('rejects when length is less than 1', async () => {
        await expect(generateRandomStringProm(0)).rejects.toThrow("Length must be greater than 0");
    });
});