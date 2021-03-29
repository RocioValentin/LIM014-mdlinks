const path = require('path');
const fs = require('fs');
const axios = require('axios');

// Determina si la ruta es absoluta, si no resuelve la ruta
const getRoute = (route) => {
  const isAbsolute = path.isAbsolute(route);
  switch (isAbsolute) {
    case true: return route;
    case false: return (path.resolve(route));
    default:
  }
  return route;
};

console.log(getRoute('/home/laboratoria/LIM014-mdlinks/src/index.js'));

// Identifica si la ruta es File o Directorio
const isDir = (route) => {
  const stats = fs.statSync(route);
  const isDirectory = stats.isDirectory(route);
  return isDirectory;
};

// console.log(isDir('/home/laboratoria/LIM014-mdlinks/src/index.js'));

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
console.log(readDir('/home/laboratoria/LIM014-mdlinks/src/hola'));

// Lee el File
const markdown = (route) => fs.readFileSync(route, 'utf-8');

// Extrae los links y el text

const getLink = (md) => {
  const regex = /!*\[(.+?)\]\((.+?)\)/gi;// Mediante una expresión regular le decimos que extraiga los links que esten dentro de los corchetes y los parentesis

  const resultUrl = md.match(regex);

  const textRegex = /\[(\w+.+?)\]/gi; // Solo lo que se encuentre dentro de los corchetes
  const urlRegex = /\((\w+.+?)\)/gi; // Solo lo que se encuentre dentro de los parentesis
  const finalResult = [];

  for (let i = 0; i < resultUrl.length; i += 1) {
    const onlyString = resultUrl[i].match(textRegex)[0].substring(1,
      resultUrl[i].match(textRegex)[0].length - 1);
      // console.log(onlyString);
    const onlyUrl = resultUrl[i].match(urlRegex)[0].substring(1,
      resultUrl[i].match(urlRegex)[0].length - 1);
      // console.log(onlyUrl);

    finalResult.push({
      text: onlyString,
      href: onlyUrl,
    });
  }
  return (finalResult); // En finalResult guardamos el array de objetos con los links
};

// Extrae solo links
const onlyLinks = (arrayobj) => {
  const links = [];
  arrayobj.forEach((obj) => {
    const pureLink = obj.href;
    links.push(pureLink);
  });
  return links;
};
const newArray = [{
  text: 'labore',
  href: 'https://en.wiktionary.org/wiki/labore',
},
{ text: 'job', href: 'https://en.wiktionary.org/wiki/labore' }];
console.log(onlyLinks(newArray));

// Extrae solo text
const getText = (md) => {
  const regex = /!*\[(.+?)\]\((.+?)\)/gi;

  const resultUrl = md.match(regex);

  const textRegex = /\[(\w+.+?)\]/gi;
  const finalResult = [];

  for (let i = 0; i < resultUrl.length; i += 1) {
    const onlyString = resultUrl[i].match(textRegex)[0].substring(1,
      resultUrl[i].match(textRegex)[0].length - 1);

    finalResult.push({ text: onlyString });
  }
  return finalResult;
};

console.log(getLink(markdown('/home/laboratoria/LIM014-mdlinks/src/hola/hola1.md')));
console.log(getText(markdown('/home/laboratoria/LIM014-mdlinks/src/hola/hola1.md')));
const validateLinks = (link) => {
  const getStatus = axios.get(link);
  return getStatus
    .then((res) => res.status)
    .catch((error) => console.log(error));
};

const validate = (arrayobj) => {
  const results = [];
  arrayobj.forEach((link) => {
    const promise = validateLinks(link);
    results.push(promise);
  });
  Promise.all(results).then((res) => {
    console.log(res);
  });
  return results;
};
console.log(validate(['https://en.wiktionary.org/wiki/labore',
'https://en.wiktionary.org/wiki/labore']));

/* const status = (arrayobj) => {
  const totalStatus = [];
  Promise.all(arrayobj).then((res) => {
    totalStatus.push(res);
  });
  return totalStatus;
};
console.log(status(['https://en.wiktionary.org/wiki/labore',
'https://en.wiktionary.org/wiki/labore'])); */
// constmarkdown=readFileSync('/home/laboratoria/LIM014-mdlinks/src/hola/hola1.md',{encoding:'utf8'}

// const links = markdownLinkExtractor(markdown);

// links.forEach((link) => {
// console.log(link);
// });

// console.log(markdown);

module.exports = () => {
  // ...
};
