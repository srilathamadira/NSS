const uploadOnCloudinary = async (fileBuffer) => {
    try {
      if (!fileBuffer) return null;
  
      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { resource_type: "auto" },
          (error, result) => {
            if (error) {
              console.error("Cloudinary upload error:", error);
              reject(error);
            } else {
              console.log("File uploaded successfully:", result.secure_url); // Log secure URL
              resolve(result.secure_url); // Return only secure_url
            }
          }
        );
        stream.end(fileBuffer);
      });
  
    } catch (err) {
      console.error("Cloudinary upload failed:", err);
      return null;
    }
  };
  