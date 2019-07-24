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
      performance: 0.8,
      accessibility: 0.8,
      'best-practices': 0.8,
      seo: 0.8,
      pwa: 0
    };
    Object.keys(defaults).forEach(key => {
      this.context.options.scores[key] = !isNaN(this.context.options.scores[key])
        ? this.context.options.scores[key]
        : defaults[key];
    });
  }

  run(sandbox) {
    return new Promise((resolve, reject) => {
      this.runLighthouse(this.context.options.url)
        .then(results => {
          if (!results) {
            reject(new Error('No results returned.'));
          }
          const scores = Object.keys(results.categories)
            .map(key => {
              return results.categories[key].score < this.context.options.scores[key]
                ? `${key}: score ${results.categories[key].score} is below required ${this.context.options.scores[key]}`
                : null;
            })
            .filter(Boolean);
          if (scores.length > 0) {
            sandbox.report({
              message: scores.join('\n')
            });
          }
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

LighthouseAudit.meta = {
  category: 'general',
  description: 'Runs lighthouse audits on provided URL',
  recommended: true,
  docsUrl: 'https://github.com/jam3/adviser-plugin-lighthouse/tree/master/docs/rules/lighthouse.md'
};

module.exports = LighthouseAudit;
