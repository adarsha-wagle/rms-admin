import imageCompression from 'browser-image-compression';

/**
 * Compress image file that is greater than 1mb
 * @param imageFile - Image File that needs to be compressed.
 * @returns Compress Image below 1mb
 *
 */

export async function compressImage(imageFile) {
  const options = {
    maxSizeMB: 1,
    maxWidthOrHeight: 1920,
    useWebWorker: true,
  };
  try {
    // if file size is less than options.maxSizeMB, return original file
    if (imageFile.size / 1024 / 1024 < options.maxSizeMB) {
      return imageFile;
    }

    const compressedFile = await imageCompression(imageFile, options);

    // convert blob to file
    const convertedBlobFile = new File([compressedFile], 'image.jpeg', {
      type: 'image/jpeg',
      lastModified: Date.now(),
    });

    return convertedBlobFile;
  } catch (error) {
    console.log(error);
    return error;
  }
}
