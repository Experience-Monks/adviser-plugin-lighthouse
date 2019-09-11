'use strict';

const Adviser = require('adviser');
const chromeLauncher = require('chrome-launcher');
const isURL = require('is-url');
const lighthouse = require('lighthouse');

class Lighthouse extends Adviser.Plugin {
  constructor(settings) {
    super(settings);

    if (!this.settings.url || !isURL(this.settings.url)) {
      throw new Error(`No valid url provided.`);
    }

    const score = require('./rules/score');
    this.rules = {
      performance: score,
      accessibility: score,
      seo: score,
      'best-practices': score,
      pwa: score
    };
  }

  async preRun(context) {
    await super.preRun(context);
    return new Promise((resolve, reject) => {
      this.runLighthouse(this.settings.url)
        .then(results => {
          context.addShareableData(results);
          resolve();
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  runLighthouse(url, opts = null) {
    if (!opts) {
      opts = {
        chromeFlags: ['--show-paint-rects']
      };
    }
    return chromeLauncher.launch({ chromeFlags: opts.chromeFlags }).then(chrome => {
      opts.port = chrome.port;
      return lighthouse(url, opts).then(results => {
        return chrome.kill().then(() => results.lhr);
      });
    });
  }
}

Lighthouse.meta = {
  description: 'Rules for running Lighthouse audits on a domain.',
  recommended: true
};

module.exports = Lighthouse;
