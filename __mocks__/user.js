/* const axios = require('axios');

class Values {
  static all() {
    return axios.get('https://en.wiktionary.org/wiki/labore').then((resp) => {
      const { status } = resp;
      const textStatus = 'ok';
      return {
        status, textStatus,
      };
    });
  }
}

module.exports = Values; */

module.exports = {
  get: jest.fn(() => Promise.resolve({ data: {} })),
};

// jest.spyOn(axios, 'get');
