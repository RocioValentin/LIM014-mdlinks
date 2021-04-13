const {
  getRoute,
  isDir,
  extMD,
  readDir,
  markdown,
  complete,
} = require('../src/api.js');

// const mdLinks = require('../src/mdLinks.js');

describe('getRoute', () => {
  it('should a function', () => {
    expect(typeof getRoute).toBe('function');
  });
  it('return', () => {
    expect(getRoute('/home/laboratoria/LIM014-mdlinks/src')).toEqual('/home/laboratoria/LIM014-mdlinks/src');
  });
  it('return', () => {
    expect(getRoute('src')).toEqual('/home/laboratoria/LIM014-mdlinks/src');
  });
});

describe('isDir', () => {
  it('should a function', () => {
    expect(typeof getRoute).toBe('function');
  });
  it('return', () => {
    expect(isDir('/home/laboratoria/LIM014-mdlinks/src')).toEqual(true);
  });
  it('return', () => {
    expect(isDir('/home/laboratoria/LIM014-mdlinks/src/api.js')).toEqual(false);
  });
});

describe('extMD', () => {
  it('should a function', () => {
    expect(typeof extMD).toBe('function');
  });
  it('return', () => {
    expect(extMD('/home/laboratoria/LIM014-mdlinks/src/index.js')).toEqual('.js');
  });
});

describe('readDir', () => {
  it('should a function', () => {
    expect(typeof readDir).toBe('function');
  });
  it('return', () => {
    expect(readDir('/home/laboratoria/LIM014-mdlinks/src/hola/bye/bye1/Hello')).toEqual(['/home/laboratoria/LIM014-mdlinks/src/hola/bye/bye1/Hello/Hello.md']);
  });
  it('return', () => {
    expect(readDir('/home/laboratoria/LIM014-mdlinks/src/hola')).toEqual([
      '/home/laboratoria/LIM014-mdlinks/src/hola/bye/bye.md',
      '/home/laboratoria/LIM014-mdlinks/src/hola/bye/bye1/Hello/Hello.md',
      '/home/laboratoria/LIM014-mdlinks/src/hola/bye/bye1/hiiii.md',
      '/home/laboratoria/LIM014-mdlinks/src/hola/hola.md',
      '/home/laboratoria/LIM014-mdlinks/src/hola/hola1.md',
    ]);
  });
});

describe('markdown', () => {
  it('should a function', () => {
    expect(typeof markdown).toBe('function');
  });
  it('return', () => {
    expect(markdown('/home/laboratoria/LIM014-mdlinks/src/hola/bye/bye.md')).toEqual('');
  });
});

describe('complete', () => {
  it('should a function', () => {
    expect(typeof complete).toBe('function');
  });
  it('return', () => {
    expect(complete(['/home/laboratoria/LIM014-mdlinks/src/hola/hola1.md'])).toEqual([{
      href: 'https://en.wiktionary.org/wiki/labore',
      text: 'labore',
      fileName: '/home/laboratoria/LIM014-mdlinks/src/hola/hola1.md',
    },
    {
      href: 'https://en.wiktionary.org/wiki/labore',
      text: 'job',
      fileName: '/home/laboratoria/LIM014-mdlinks/src/hola/hola1.md',
    },
    {
      href: 'http://www.abab.com.pe/aldo-bruno',
      text: 'Criss',
      fileName: '/home/laboratoria/LIM014-mdlinks/src/hola/hola1.md',
    }]);
  });
});
