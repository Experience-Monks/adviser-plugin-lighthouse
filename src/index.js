'use strict';

const path = require('path');

const requireIndex = require('requireindex');
const chromeLauncher = require('chrome-launcher');
const lighthouse = require('lighthouse');
const isURL = require('is-url');
const Adviser = require('adviser');

class LighthousePlugin extends Adviser.Plugin {
  constructor(settings) {
    super(settings);

    this.rules = requireIndex(path.join(__dirname, '/rules'));

    if (!settings.url || !isURL(settings.url)) {
      throw new Error(`No valid url provided.`);
    }

    this.url = settings.url;
  }

  async preRun(context) {
    const opts = {
      chromeFlags: ['--show-paint-rects']
    };

    const chrome = await chromeLauncher.launch({ chromeFlags: opts.chromeFlags });
    opts.port = chrome.port;
    const results = await lighthouse(this.url, opts);
    await chrome.kill();

    if (!results.lhr) {
      throw new Error('No results returned.');
    }

    context.addShareableData(results.lhr);
  }
}

LighthousePlugin.meta = {
  description: 'Lighthouse wrapper',
  recommended: true
};

module.exports = LighthousePlugin;
