const {
  getRoute,
  isDir,
  extMD,
  readDir,
  validate,
  complete,
} = require('./api.js');

const mdLinks = (path, option = { validate: false }) => new Promise((resolve, reject) => {
  const pathAbs = getRoute(path);
  const isDirectory = isDir(pathAbs);
  const getExtension = extMD(pathAbs);
  if (isDirectory === false) {
    if (getExtension === '.md') {
      if (option.validate === true) {
        const fileMd = [pathAbs];
        const listLinks = complete(fileMd);
        const listLinksValidate = validate(listLinks);
        resolve(listLinksValidate);
      } else {
        const fileMd = [pathAbs];
        const listLinks = complete(fileMd);
        resolve(listLinks);
      }
    } else {
      reject(new Error('No es un archivo con extension .md'));
    }
  } else if (isDirectory === true) {
    if (option.validate === true) {
      const filesMd = readDir(pathAbs);
      // console.log(filesMd);
      const listLink = complete(filesMd);
      // console.log(listLink);
      const listLinksValidates = validate(listLink);
      resolve(listLinksValidates);
    } else {
      const filesMd = readDir(pathAbs);
      const listLink = complete(filesMd);
      resolve(listLink);
    }
  } else if (isDirectory === undefined) {
    reject(new Error('Ruta no encontrada'));
  }
});

/* mdLinks('/home/laboratoria/LIM014-mdlinks/src/hola', { validate: true })
  .then((result) => console.table(result))
  .catch(console.error); */

module.exports = mdLinks;
