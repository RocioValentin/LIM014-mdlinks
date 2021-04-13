#!/usr/bin/env node
const mdlinks = require('./mdLinks.js');

const {
  stats,
  validateAndStats,
} = require('./api.js');

const [,, ...args] = process.argv;

if (args.length === 0) {
  console.log('Ingresa tu ruta y opciones');
} else if (args.length === 1) {
  const path = args[0];
  mdlinks(path, { validate: false })
    .then((result) => console.table(result))
    .catch((error) => console.log(error));
} else if (args.length === 2) {
  if (args[1] === '--validate') {
    const path = args[0];
    mdlinks(path, { validate: true })
      .then((result) => console.table(result))
      .catch((error) => console.log(error));
  } else if (args[1] === '--stats') {
    const path = args[0];
    mdlinks(path, { validate: true })
      .then((result) => console.table(stats(result)))
      .catch((error) => console.log(error));
  } else {
    console.log('opcion inválida');
  }
} else if (args.length === 3) {
  if (args[1] === '--validate' && args[2] === '--stats') {
    const path = args[0];
    mdlinks(path, { validate: true })
      .then((result) => console.table(validateAndStats(result)))
      .catch((error) => console.log(error));
  } else if (args[2] === '--validate' && args[1] === '--stats') {
    const path = args[0];
    mdlinks(path, { validate: true })
      .then((result) => console.table(validateAndStats(result)))
      .catch((error) => console.log(error));
  } else {
    console.log('opciones inválidas');
  }
} else {
  console.log('ingreso inválido');
}
