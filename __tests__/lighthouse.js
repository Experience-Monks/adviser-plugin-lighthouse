'use strict';

const LighthousePlugin = require('../src');

describe('Run lighthouse audit', () => {
  test('Plugin required parameters', () => {
    expect(() => {
      const lighthousePlugin = new LighthousePlugin({});
      lighthousePlugin.preRun();
    }).toThrowError('No valid url');
  });
});
