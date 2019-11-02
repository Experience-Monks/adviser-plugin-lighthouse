'use strict';

const Adviser = require('adviser');

class GlobalScores extends Adviser.Rule {
  constructor(context) {
    super(context);

    const defaults = {
      performance: 0.8,
      accessibility: 0.8,
      'best-practices': 0.8,
      seo: 0.8,
      pwa: 0
    };

    this.scores = {};
    this.lighthouseResults = context.shared;

    Object.keys(defaults).forEach(key => {
      this.scores[key] = !isNaN(this.context.options.scores[key]) ? this.context.options.scores[key] : defaults[key];
    });
  }

  run(sandbox) {
    const categories = this.lighthouseResults.categories;
    Object.keys(categories).forEach(key => {
      if (categories[key].score < this.scores[key]) {
        sandbox.report({
          message: `${key}: score ${categories[key].score} is below required ${this.scores[key]}`
        });
      }
    });
  }
}

GlobalScores.meta = {
  category: 'general',
  description: 'Runs lighthouse audits on provided URL',
  recommended: true,
  docsUrl: 'https://github.com/jam3/adviser-plugin-lighthouse/tree/master/docs/rules/lighthouse.md'
};

module.exports = GlobalScores;
