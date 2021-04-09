const axios = require('axios');

jest.mock('../__mocks__/user', () => ({
  get: jest.fn(),
}));
// const mock = require('../__mocks__/user');
// const Values = require('../__mocks__/user');

const {
  validate,
  validateLinks,
} = require('../src/index.js');

describe('Validate', () => {
  test('should fetch users', () => {
    const user = {
      status: 200,
      textStatus: 'ok',
    };
    const result = [{
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
    // axios.get.mockResolvedValue(validate(resp));

    // or you could use the following depending on your use case:
    axios.get.mockImplementation(() => Promise.resolve(user));
    return validate(resp)
      .then((data) => {
        expect(data).toEqual(result);
      });
  });
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
