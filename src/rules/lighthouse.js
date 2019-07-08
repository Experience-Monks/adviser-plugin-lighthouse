'use strict';

const Adviser = require('adviser');
const chromeLauncher = require('chrome-launcher');
const isURL = require('is-url');
const lighthouse = require('lighthouse');

class LighthouseAudit extends Adviser.Rule {
  constructor(context) {
    super(context);

    if (!this.context.options.url || !isURL(this.context.options.url)) {
      throw new Error(`No valid url provided.`);
    }

    if (!this.context.options.scores) {
      this.context.options.scores = {};
    }
    const defaults = {
      performance: 80,
      accessibility: 80,
      bestPractices: 80,
      seo: 80,
      pwa: 0
    };
    this.context.options.scores = Object.keys(defaults).map(key => {
      return !isNaN(this.context.options.scores[key]) ? this.context.options.scores[key] : defaults[key];
    });
  }

  run(sandbox) {
    return new Promise((resolve, reject) => {
      this.runLighthouse().then(results => {});
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
      return lighthouse(url, opts).then(results => chrome.kill().then(() => results.lhr));
    });
  }
}

LighthouseAudit.meta = {
  category: 'general',
  description: 'Runs lighthouse audits on provided URL',
  recommended: true,
  docsUrl: 'https://github.com/jam3/adviser-plugin-lighthouse/tree/master/docs/rules/lighthouse.md'
};

module.exports = LighthouseAudit;
