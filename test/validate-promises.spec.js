const axios = require('axios');

jest.mock('axios');

const {
  validate,
  validateLinks,
} = require('../src/api.js');

describe('Validate', () => {
  test('should fetch users', () => {
    const user = {
      status: 200,
      statusText: 'ok',
    };
    const result = [{
      href: 'https://en.wiktionary.org/wiki/labore',
      text: 'LAbore',
      fileName: '/home/laboratoria/LIM014-mdlinks/src',
      estado: 200,
      textEstado: 'ok',
    }];
    const resp = [{
      href: 'https://en.wiktionary.org/wiki/labore',
      text: 'LAbore',
      fileName: '/home/laboratoria/LIM014-mdlinks/src',
    }];
    // axios.get.mockResolvedValue(validate(resp));

    // or you could use the following depending on your use case:
    axios.get.mockImplementation(() => Promise.resolve(user));
    validate(resp)
      .then((data) => {
        expect(data).toEqual(result);
      });
    const nouser = {
      status: 404,
      statusText: 'FAIL',
    };
    const noresult = [{
      href: 'http://www.abab.com.pe/aldo-bruno',
      text: 'Cris',
      fileName: '/home/laboratoria/LIM014-mdlinks/src',
      estado: 404,
      textEstado: 'FAIL',
    }];
    const noresp = [{
      href: 'http://www.abab.com.pe/aldo-bruno',
      text: 'Cris',
      fileName: '/home/laboratoria/LIM014-mdlinks/src',
    }];
    axios.get.mockImplementation(() => Promise.reject(nouser));
    validate(noresp)
      .then((data) => {
        expect(data).toEqual(noresult);
      });
  });
});

describe('ValidateLinks', () => {
  test('should fetch users', () => {
    const user = {
      status: 200,
      statusText: 'ok',
    };
    const result = {
      href: 'https://en.wiktionary.org/wiki/labore',
      text: 'LAbore',
      fileName: '/home/laboratoria/LIM014-mdlinks/src',
      estado: 200,
      textEstado: 'ok',
    };
    const resp = {
      href: 'https://en.wiktionary.org/wiki/labore',
      text: 'LAbore',
      fileName: '/home/laboratoria/LIM014-mdlinks/src',
    };
    // axios.get.mockResolvedValue(validate(resp));

    // or you could use the following depending on your use case:
    axios.get.mockImplementation(() => Promise.resolve(user));
    validateLinks(resp)
      .then((data) => {
        expect(data).toEqual(result);
      });
    const nouser = {
      status: 404,
      statusText: 'FAIL',
    };
    const noresult = {
      href: 'http://www.abab.com.pe/aldo-bruno',
      text: 'Cris',
      fileName: '/home/laboratoria/LIM014-mdlinks/src',
      estado: 404,
      textEstado: 'FAIL',
    };
    const noresp = {
      href: 'http://www.abab.com.pe/aldo-bruno',
      text: 'Cris',
      fileName: '/home/laboratoria/LIM014-mdlinks/src',
    };
    axios.get.mockImplementation(() => Promise.reject(nouser));
    validateLinks(noresp)
      .then((data) => {
        expect(data).toEqual(noresult);
      });
  });
});
