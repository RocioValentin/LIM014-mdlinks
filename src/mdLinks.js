const {
  getRoute,
  isDir,
  extMD,
  readDir,
  markdown,
  getLink,
  validateLinks,
  validate,
  complete,
} = require('./index.js');

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
  } else {
    const filesMD = readDir(pathAbs);
    const list
  }
});
module.exports = mdLinks;
