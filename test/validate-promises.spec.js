const axios = require('axios');

const Users = require('../__mocks__/user');

jest.mock('axios');

const {
  validate,
  validateLinks,
} = require('../src/index.js');

jest.mock('axios');

test.only('should fetch users', () => {
  const users = [{
    href: 'https://en.wiktionary.org/wiki/labore',
    text: 'LAbore',
    fileName: '/home/laboratoria/LIM014-mdlinks/src',
    status: 200,
    textStatus: 'ok',
  }];
  const resp = [{
    href: 'https://en.wiktionary.org/wiki/labore',
    text: 'LAbore',
    fileName: '/home/laboratoria/LIM014-mdlinks/src',
  }];
  axios.get.mockResolvedValue(resp);

  // or you could use the following depending on your use case:
  // axios.get.mockImplementation(() => Promise.resolve(resp))

  return Users.all().then((data) => expect(validate(data)).toEqual(users));
});

test.skip('validate resolves', () => expect(validate([{
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
  }]));

test.skip('validate rejects', () => expect(validate([{
  href: 'https://en.wiktionary.org/wiki/labore.u.u',
  text: 'LAbore',
  fileName: '/home/laboratoria/LIM014-mdlinks/src',
}]))
  .rejects.toEqual([{
    href: 'https://en.wiktionary.org/wiki/labore.u.u',
    text: 'LAbore',
    fileName: '/home/laboratoria/LIM014-mdlinks/src',
    status: 'not status',
    textStatus: 'fail',
  }]));

test.skip('validateLinks resolves', () => expect(validateLinks({
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
  }));

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
