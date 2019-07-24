'use strict';

const noop = () => {};
const Lighthouse = require('../src/rules/lighthouse');

describe('Run lighthouse audit', () => {
  test('Check lighthouse audit runs', () => {
    const lighthouse = new Lighthouse({ options: { url: 'https://google.com/' } });
    return lighthouse.run({ report: noop }).then(noop, error => {
      throw error;
    });
  }, 30000);
  test('Lighthouse fails with no url provided', () => {
    expect(() => new Lighthouse({ options: {} })).toThrow(`No valid url provided.`);
  });
});
