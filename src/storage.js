const s3 = require('../src/settings/aws');

const uploadFile = async (path, buffer, mimetype) => {
    const file  = await s3.upload({
        Bucket: process.env.BACKBLAZE_BUCKET,
        Key: path,
        Body: buffer,
        ContentType: mimetype
    }).promise();

    return {
        produto_imagem: file.Location
    };
};
 
const removeFile = async (path) => {
    await s3.deleteObject({
    Bucket: process.env.BACKBLAZE_BUCKET,
    Key: path
}).promise();
}

module.exports = {
    uploadFile,
    removeFile
}
