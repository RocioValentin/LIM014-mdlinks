const path = require('path');
const fs = require('fs');
const axios = require('axios');

// Determina si la ruta es absoluta, si no resuelve la ruta
const getRoute = (route) => {
  let ruta = route;
  const isAbsolute = path.isAbsolute(route);
  if (isAbsolute === false) {
    ruta = (path.resolve(route));
  } else {
    ruta = route;
  }
  return ruta;
};

// cambiar por if

// console.log(getRoute('/home/laboratoria/LIM014-mdlinks/src/index.js'));

// Identifica si la ruta es File o Directorio
const isDir = (route) => {
  const exist = fs.existsSync(route);
  let isDirectory;
  if (exist === true) {
    const stats = fs.statSync(route);
    isDirectory = stats.isDirectory(route);
  } else {
    isDirectory = undefined;
  }
  return isDirectory;
};

// console.log(isDir('/home/laboratoria/LIM014-mdlinks/src/inde'));

// Identifica la extension del archivo
const extMD = (route) => path.extname(route);

// console.log(extMD('/home/laboratoria/LIM014-mdlinks/src/index.js'));

// Lee el directorio y sus elementos

const readDir = (route) => {
  let allMD = [];
  const dataDir = fs.readdirSync(route);
  dataDir.forEach((files) => {
    const filePath = path.join(route, files);
    if (extMD(filePath) === '.md') {
      allMD.push(filePath);
    } else if (isDir(filePath) === true) {
      allMD = allMD.concat(readDir(filePath));
    }
  });
  return allMD;
};
// console.log(readDir('/home/laboratoria/LIM014-mdlinks/src/hola'));

// Lee el File
const markdown = (route) => fs.readFileSync(route, 'utf-8');

// Extrae los links y el text

const getLink = (md) => {
  const regex = /!*\[(.+?)\]\((.+?)\)/gi;// Mediante una expresión regular le decimos que extraiga los links que esten dentro de los corchetes y los parentesis

  const resultUrl = md.match(regex);

  const textRegex = /\[(\w+.+?)\]/gi; // Solo lo que se encuentre dentro de los corchetes
  const urlRegex = /\((\w+.+?)\)/gi; // Solo lo que se encuentre dentro de los parentesis
  const finalResult = [];

  if (resultUrl.length !== 0) {
    for (let i = 0; i < resultUrl.length; i += 1) {
      const onlyString = resultUrl[i].match(textRegex)[0].substring(1,
        resultUrl[i].match(textRegex)[0].length - 1);
      // console.log(onlyString);
      const onlyUrl = resultUrl[i].match(urlRegex)[0].substring(1,
        resultUrl[i].match(urlRegex)[0].length - 1);
      // console.log(onlyUrl);

      finalResult.push({
        href: onlyUrl,
        text: onlyString,
      });
    }
  }
  return (finalResult); // En finalResult guardamos el array de objetos con los links
};

// Devuelve un objeto { href, text, filename}
const complete = (arrayMD) => {
  let objComplete = [];
  arrayMD.forEach((fileMD) => {
    const lecture = markdown(fileMD);
    if (lecture !== '') {
      const saveURL = getLink(lecture);
      saveURL.forEach((url) => {
      // eslint-disable-next-line no-param-reassign
        url.fileName = fileMD;
      });
      objComplete = objComplete.concat(saveURL);
    }
  });
  return objComplete;
};
// console.log(complete(['/home/laboratoria/LIM014-mdlinks/src/hola/hola1.md']));

// console.log(getLink(markdown('/home/laboratoria/LIM014-mdlinks/src/hola/hola1.md')));
// console.log(getText(markdown('/home/laboratoria/LIM014-mdlinks/src/hola/hola1.md')));

// Valida los links con Axios
const validateLinks = ({ href, text, fileName }) => axios.get(href)
  .then((res) => {
    // console.log(`line107`);
    // console.log(res);
    const estado = res.status;
    const textEstado = res.statusText;
    // const textStatus = 'ok';
    return {
      href, text, fileName, estado, textEstado,
    };
  })
  .catch((error) => {
    let estado;
    let textEstado;
    if (error) {
      estado = 404;
      textEstado = 'FAIL';
    } else {
      estado = 'not status';
      textEstado = 'FAIL';
    }
    return {
      href, text, fileName, estado, textEstado,
    };
  });

// Promesa que recorre un array de objetos de varios links
const validate = (arrayobj) => {
  const results = [];
  arrayobj.forEach((link) => {
    const promise = validateLinks(link);
    results.push(promise);
    // console.log(results);
  });
  return Promise.all(results);
};

const stats = (arrayobj) => {
  const totalLinks = arrayobj.length;
  const uniqueLinks = [new Set(arrayobj.map((link) => link.href))].length;
  return { Total: totalLinks, Unique: uniqueLinks };
};

const validateAndStats = (arrayobj) => {
  const totalLinks = arrayobj.length;
  const uniqueLinks = [new Set(arrayobj.map((link) => link.href))].length;
  let brokenLinks = 0;
  arrayobj.forEach((element) => {
    if (element.textEstado === 'FAIL') brokenLinks += 1;
  });
  return { Total: totalLinks, Unique: uniqueLinks, Broken: brokenLinks };
};
/* console.log(validateAndStats([{
  href: 'https://en.wiktionary.org/wiki/labore',
  text: 'LAbore',
  fileName: '/home/laboratoria/LIM014-mdlinks/src',
  status: 200,
  textStatus: 'ok',
}]));
console.log(stats([{
  href: 'https://en.wiktionary.org/wiki/labore',
  text: 'LAbore',
  fileName: '/home/laboratoria/LIM014-mdlinks/src',
}, {
  href: 'https://en.wiktionary.org/wiki/labore',
  text: 'LAbore',
  fileName: '/home/laboratoria/LIM014-mdlinks/src',
}])); */
/* validate([{
  href: 'https://en.wiktionary.org/wiki/laboresasqs',
  text: 'LAbore',
  fileName: '/home/laboratoria/LIM014-mdlinks/src',
}])
  .then((res) => console.log(res))
  .catch((error) => console.log('salio mal', error)); */

module.exports = {
  getRoute,
  isDir,
  extMD,
  readDir,
  markdown,
  getLink,
  validateLinks,
  validate,
  complete,
  stats,
  validateAndStats,
};
