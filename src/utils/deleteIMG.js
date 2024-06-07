const cloudinary = require('cloudinary').v2;

const deleteFile = (url) => {
  const imgSplitted = url.split('/');

  //Se extrae el nombre de la carpeta donde está almacenado el archivo, que es el penúltimo segmento de la URL
  const folderName = imgSplitted[imgSplitted.length - 2];

  //Se extrae el nombre del archivo, que es el último segmento de la URL
  const fileName = imgSplitted[imgSplitted.length - 1].split('.');

  const public_id = `${folderName}/${fileName[0]}`;

  cloudinary.uploader.destroy(public_id, () => {
    console.log('IMG ELIMINATED');
  });
};

module.exports = { deleteFile };
