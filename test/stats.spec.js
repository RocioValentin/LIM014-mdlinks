const {
  stats,
  validateAndStats,
} = require('../src/index.js');

describe('Stats ', () => {
  it('should a function', () => {
    expect(typeof stats).toBe('function');
  });
  it('return', () => {
    expect(stats([{
      href: 'https://en.wiktionary.org/wiki/labore',
      text: 'labore',
      fileName: '/home/laboratoria/LIM014-mdlinks/src/hola/hola1.md',
    },
    {
      href: 'https://en.wiktionary.org/wiki/labore',
      text: 'job',
      fileName: '/home/laboratoria/LIM014-mdlinks/src/hola/hola1.md',
    }])).toEqual({ Total: 2, Unique: 1 });
  });
});

describe('Stats and Validate ', () => {
  it('should a function', () => {
    expect(typeof validateAndStats).toBe('function');
  });
  it('return', () => {
    expect(validateAndStats([{
      href: 'https://en.wiktionary.org/wiki/labore',
      text: 'LAbore',
      fileName: '/home/laboratoria/LIM014-mdlinks/src',
      status: 200,
      textStatus: 'ok',
    }])).toEqual({ Total: 1, Unique: 1, Broken: 0 });
  });
});
