const cloudinary = require('cloudinary').v2
const fs = require('fs');

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
  });

const uploadCloudinary = async(FilePath, folder, height, quality)=>{
    try {
    const options = {folder};
    if(height) {
        options.height = height;
    }
    if(quality) {
        options.quality = quality;
    }
    options.resource_type = "auto";

    const res = await cloudinary.uploader.upload(FilePath, options);
    return res;

    } catch (error) {
        fs.unlinkSync(FilePath); 
        return null;
    }
}

module.exports = uploadCloudinary;
