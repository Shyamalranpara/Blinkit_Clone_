const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET_KEY
});

const uploadimageCloudinary = async (image) => {
    const buffer = image?.buffer || Buffer.from(await image.arrayBuffer());

    const uploadImage = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream({ folder: "blinkit" }, (error, uploadResult) => {
            if (error) return reject(error);
            return resolve(uploadResult);
        }).end(buffer);
    });

    return uploadImage;
};

module.exports = uploadimageCloudinary;
