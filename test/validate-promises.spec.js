const {
  validate,
  validateLinks,
} = require('../src/index.js');

test('validate resolves', () => {
  expect(validate([{
    href: 'https://en.wiktionary.org/wiki/labore',
    text: 'LAbore',
    fileName: '/home/laboratoria/LIM014-mdlinks/src',
  }]))
    .resolves.toEqual([{
      href: 'https://en.wiktionary.org/wiki/labore',
      text: 'LAbore',
      fileName: '/home/laboratoria/LIM014-mdlinks/src',
      status: 200,
      textStatus: 'ok',
    }]);
});

test('validate rejects', () => {
  expect(validate([{
    href: 'https://en.wiktionary.org/wiki/labore.u.u',
    text: 'LAbore',
    fileName: '/home/laboratoria/LIM014-mdlinks/src',
  }]))
    .resolves.toEqual([{
      href: 'https://en.wiktionary.org/wiki/labore.u.u',
      text: 'LAbore',
      fileName: '/home/laboratoria/LIM014-mdlinks/src',
      status: 'not status',
      textStatus: 'fail',
    }]);
});

test('validateLinks resolves', () => {
  expect(validateLinks({
    href: 'https://en.wiktionary.org/wiki/labore',
    text: 'LAbore',
    fileName: '/home/laboratoria/LIM014-mdlinks/src',
  }))
    .resolves.toEqual({
      href: 'https://en.wiktionary.org/wiki/labore',
      text: 'LAbore',
      fileName: '/home/laboratoria/LIM014-mdlinks/src',
      status: 200,
      textStatus: 'ok',
    });
});

/* test('validateLinks rejects', () => {
  expect(validateLinks({
    href: 'https://en.wiktionary.org/wiki/labore.u.u',
    text: 'LAbore',
    fileName: '/home/laboratoria/LIM014-mdlinks/src',
  }))
    .rejects.toEqual({
      href: 'https://en.wiktionary.org/wiki/labore.u.u',
      text: 'LAbore',
      fileName: '/home/laboratoria/LIM014-mdlinks/src',
      status: 'not status',
      textStatus: 'fail',
    });
}); */
