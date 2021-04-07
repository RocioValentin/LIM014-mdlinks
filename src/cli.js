#!/usr/bin/env node
const mdlinks = require('./mdLinks.js');
/* const {
  stats,
  validateAndStats,
} = require('./index.js'); */
const [,, ...args] = process.argv;

console.log(args);

/* const path = args[0];
console.log(path); */

if (args.length === 0) {
  console.log('Osheee ingresa tu ruta');
} else if (args.length === 1) {
  const path = args[0];
  mdlinks(path, { validate: false })
    .then((result) => console.table(result))
    .catch((error) => console.log(error));
}
