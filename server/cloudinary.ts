/**
 * Cloudinary configuration and upload helpers
 * Used for storing generated images from the newsletter system
 */
import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary with environment variables
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export interface CloudinaryUploadResult {
  url: string;
  publicId: string;
  width?: number;
  height?: number;
}

/**
 * Upload a buffer (image data) to Cloudinary
 * @param buffer - The image buffer to upload
 * @param folder - Optional folder path in Cloudinary
 * @returns Promise with the upload result containing URL and public ID
 */
export async function uploadToCloudinary(
  buffer: Buffer,
  folder: string = 'newsletter-images'
): Promise<CloudinaryUploadResult> {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: 'image',
        format: 'png',
        transformation: [
          { quality: 'auto:best' },
          { fetch_format: 'auto' }
        ]
      },
      (error, result) => {
        if (error) {
          reject(new Error(`Cloudinary upload failed: ${error.message}`));
        } else if (result) {
          resolve({
            url: result.secure_url,
            publicId: result.public_id,
            width: result.width,
            height: result.height,
          });
        } else {
          reject(new Error('Cloudinary upload returned no result'));
        }
      }
    );
    
    uploadStream.end(buffer);
  });
}

/**
 * Upload an image from a base64 string to Cloudinary
 * @param base64Data - Base64 encoded image data
 * @param folder - Optional folder path in Cloudinary
 * @returns Promise with the upload result
 */
export async function uploadBase64ToCloudinary(
  base64Data: string,
  folder: string = 'newsletter-images'
): Promise<CloudinaryUploadResult> {
  const buffer = Buffer.from(base64Data, 'base64');
  return uploadToCloudinary(buffer, folder);
}

/**
 * Delete an image from Cloudinary by public ID
 * @param publicId - The public ID of the image to delete
 */
export async function deleteFromCloudinary(publicId: string): Promise<void> {
  await cloudinary.uploader.destroy(publicId);
}

export { cloudinary };
