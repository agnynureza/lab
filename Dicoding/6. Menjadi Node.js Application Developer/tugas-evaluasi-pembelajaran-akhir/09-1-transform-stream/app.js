/**
 * @TODO
 * Buatlah fungsi `createBase64TransformStream` yang mengonversi data yang masuk menjadi base64.
 */
const { Transform } = require('stream');

function createBase64TransformStream(text){
    return new Transform({
        transform(chunk, encoding, callback) {
            const base64Chunk = chunk.toString('base64');
            callback(null, base64Chunk);
        }
    });
}