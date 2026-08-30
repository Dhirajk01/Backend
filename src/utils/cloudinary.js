import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (locaFilePath) => {
  try {
    if (!locaFilePath) return null;
    // upload the file on cloudinary
    const response = await cloudinary.uploader.upload(locaFilePath, {
      resource_type: "auto",
    });

    // file has been uploaded sucessfully
    // console.log(response.url, "file uploaded");
    fs.unlinkSync(locaFilePath);

    return response;
  } catch (error) {
    fs.unlinkSync(locaFilePath); // remove the locally saved file as the upload operation get failed
  }
};

export { uploadOnCloudinary };
