import axios from 'axios';
import { toast } from 'react-toastify';
console.log("process.env.CLOUDINARY_CLOUD_NAME",process.env.REACT_APP_CLOUDINARY_CLOUD_NAME)
 export const handleImageUpload = async (imageFile) => {
  if (!imageFile) return "";

  const formData = new FormData();
  formData.append("file", imageFile);
  formData.append("upload_preset",process.env.REACT_APP_CLOUDINARY_API_PRESET);  // Replace with your actual preset
  try {
    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload`,
      formData
    );
    return response.data.secure_url;
  } catch (error) {
    console.error("Error uploading image:", error);
    toast.error("Image upload failed");
    return "";
  }
};

 