const mdlinks = require('../src/mdLinks');

describe('mdlinks', () => {
  it('should a function', () => {
    expect(typeof mdlinks).toBe('function');
  });
  it('return false resolve', () => {
    expect(mdlinks('/home/laboratoria/LIM014-mdlinks/src/hola/hola1.md', { validate: false })).resolves.toEqual([
      {
        fileName: '/home/laboratoria/LIM014-mdlinks/src/hola/hola1.md',
        href: 'https://en.wiktionary.org/wiki/labore',
        text: 'labore',
      },
      {
        fileName: '/home/laboratoria/LIM014-mdlinks/src/hola/hola1.md',
        href: 'https://en.wiktionary.org/wiki/labore',
        text: 'job',
      },
      {
        fileName: '/home/laboratoria/LIM014-mdlinks/src/hola/hola1.md',
        href: 'http://www.abab.com.pe/aldo-bruno',
        text: 'Criss',
      }]);
  });
  it('return true resolve', () => {
    expect(mdlinks('/home/laboratoria/LIM014-mdlinks/src/hola/hola1.md', { validate: true })).resolves.toEqual([
      {
        fileName: '/home/laboratoria/LIM014-mdlinks/src/hola/hola1.md',
        href: 'https://en.wiktionary.org/wiki/labore',
        text: 'labore',
        estado: 200,
        textEstado: 'ok',
      },
      {
        fileName: '/home/laboratoria/LIM014-mdlinks/src/hola/hola1.md',
        href: 'https://en.wiktionary.org/wiki/labore',
        text: 'job',
        estado: 200,
        textEstado: 'ok',
      },
      {
        fileName: '/home/laboratoria/LIM014-mdlinks/src/hola/hola1.md',
        href: 'http://www.abab.com.pe/aldo-bruno',
        text: 'Criss',
        estado: 404,
        textEstado: 'FAIL',
      }]);
  });
  it('return reject', () => {
    mdlinks('/home/laboratoria/LIM014-mdlinks/src/hola/hola.txt', { validate: false })
      .catch((error) => {
        expect(error.message).toBe('No es un archivo con extension .md');
      });
  });
  it('return reject', () => {
    mdlinks('/home/laboratoria/LIM014-mdlinks/src/hola/hol', { validate: false })
      .catch((error) => {
        expect(error.message).toBe('Ruta no encontrada');
      });
  });
  it('return true resolve directory', () => {
    expect(mdlinks('/home/laboratoria/LIM014-mdlinks/src/hola', { validate: true })).resolves.toEqual([
      {
        fileName: '/home/laboratoria/LIM014-mdlinks/src/hola/hola.md',
        href: 'https://en.wiktionary.org/wiki/labore',
        text: 'labore',
        estado: 200,
        textEstado: 'ok',
      },
      {
        fileName: '/home/laboratoria/LIM014-mdlinks/src/hola/hola1.md',
        href: 'https://en.wiktionary.org/wiki/labore',
        text: 'labore',
        estado: 200,
        textEstado: 'ok',
      },
      {
        fileName: '/home/laboratoria/LIM014-mdlinks/src/hola/hola1.md',
        href: 'https://en.wiktionary.org/wiki/labore',
        text: 'job',
        estado: 200,
        textEstado: 'ok',
      },
      {
        fileName: '/home/laboratoria/LIM014-mdlinks/src/hola/hola1.md',
        href: 'http://www.abab.com.pe/aldo-bruno',
        text: 'Criss',
        estado: 404,
        textEstado: 'FAIL',
      }]);
  });
  it('return false resolve directory', () => {
    expect(mdlinks('/home/laboratoria/LIM014-mdlinks/src/hola', { validate: false })).resolves.toEqual([
      {
        fileName: '/home/laboratoria/LIM014-mdlinks/src/hola/hola.md',
        href: 'https://en.wiktionary.org/wiki/labore',
        text: 'labore',
      },
      {
        fileName: '/home/laboratoria/LIM014-mdlinks/src/hola/hola1.md',
        href: 'https://en.wiktionary.org/wiki/labore',
        text: 'labore',
      },
      {
        fileName: '/home/laboratoria/LIM014-mdlinks/src/hola/hola1.md',
        href: 'https://en.wiktionary.org/wiki/labore',
        text: 'job',
      },
      {
        fileName: '/home/laboratoria/LIM014-mdlinks/src/hola/hola1.md',
        href: 'http://www.abab.com.pe/aldo-bruno',
        text: 'Criss',
      }]);
  });
});
