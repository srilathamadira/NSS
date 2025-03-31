const cloudinary = require('cloudinary').v2;
require('dotenv').config();

// Configuring Cloudinary
cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET 
});

const uploadOnCloudinary = async (fileBuffer) => {
    try {
        if (!fileBuffer) return null;  

        // Upload buffer to Cloudinary
        const response = await cloudinary.uploader.upload_stream(
            { resource_type: 'auto' }, 
            (error, result) => {
                if (error) {
                    console.error("Error uploading to Cloudinary:", error);
                    return null;
                }
                console.log("File uploaded to Cloudinary:", result.url);
                return result;
            }
        ).end(fileBuffer); // End stream with file buffer

        return response;
    } catch (err) {
        console.error("Cloudinary upload error:", err);
        return null;
    }
};

module.exports = uploadOnCloudinary;
