import { writeAsyncIterableToWritable } from "@remix-run/node"; // `writeAsyncIterableToWritable` is a Node-only utility
import type { UploadApiResponse } from "cloudinary";
import cloudinary from "cloudinary";

function deleteImageCloudinary(publicId: string) {
  const deletePromise = new Promise((resolve, reject) => {
    cloudinary.v2.uploader.destroy(publicId, (error, result) => {
      if (error) {
        reject(error);
        return;
      }
      resolve(result);
    });
  });

  return deletePromise;
}

function uploadImageToCloudinary(data: AsyncIterable<Uint8Array>) {
  const uploadPromise = new Promise<UploadApiResponse>((resolve, reject) => {
    const uploadStream = cloudinary.v2.uploader.upload_stream(
      {
        folder: "properties",
      },
      (error, result) => {
        if (error) {
          reject(error);
          return;
        }
        resolve(result!);
      },
    );
    writeAsyncIterableToWritable(data, uploadStream);
  });

  return uploadPromise;
}


export { deleteImageCloudinary, uploadImageToCloudinary };