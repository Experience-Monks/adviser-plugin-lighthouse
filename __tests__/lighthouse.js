'use strict';

const noop = () => {};
const Lighthouse = require('../src/rules/lighthouse');

describe('Run lighthouse audit', () => {
  test('Check lighthouse audit', () => {
    const lighthouse = new Lighthouse({ options: { url: 'https://google.com' } });
    return lighthouse
      .run({
        report: obj => {
          if (obj.message) {
            throw new Error(obj.message);
          }
        }
      })
      .then(noop, error => {
        throw error;
      });
  }, 30000);
});
