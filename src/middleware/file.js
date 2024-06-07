const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

const getFolderName = (imageType) => {
  switch (imageType) {
    case 'events':
      return 'Events';
    case 'users':
      return 'Users';
    default:
      return 'Other';
  }
};

const uploadImg = (imageType) => {
  try {
    const folder = getFolderName(imageType);
    const storage = new CloudinaryStorage({
      cloudinary: cloudinary,
      params: {
        folder: folder,
        allowedFormats: ['jpg', 'png', 'jpeg', 'gif']
      }
    });
    return multer({ storage: storage, limits: { fileSize: 50 * 1024 * 1024 } });
  } catch (error) {
    console.error('Error during image upload configuration', error);
    throw error;
  }
};

module.exports = { uploadImg };
