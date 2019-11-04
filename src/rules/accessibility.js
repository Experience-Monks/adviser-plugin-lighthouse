'use strict';

const Adviser = require('adviser');
const isNumber = require('is-number');

const LighthouseScoreHelper = require('../utils/lighthouse-score-helper');

const CATEGORY_KEY = 'accessibility';

class Accessibility extends Adviser.Rule {
  constructor(context) {
    super(context);

    if (!this.context.options.hasOwnProperty('score') && !this.context.options.audits) {
      throw new Error(`Either score or audits properties is required.`);
    }

    if (this.context.options.hasOwnProperty('score') && !isNumber(this.context.options.score)) {
      throw new Error(`Score must be a number.`);
    }

    this.score = this.context.options.score;
    this.audits = this.context.options.audits;
    this.lighthouseResults = context.shared;
  }

  run(sandbox) {
    const lighthouseScoreHelper = new LighthouseScoreHelper(
      CATEGORY_KEY,
      this.lighthouseResults,
      this.score,
      this.audits
    );

    lighthouseScoreHelper.run(sandbox);
  }
}

Accessibility.meta = {
  category: 'general',
  description: 'Runs accessibility lighthouse audits on provided URL',
  recommended: true,
  docsUrl: 'https://github.com/jam3/adviser-plugin-lighthouse/tree/master/docs/rules/lighthouse.md'
};

module.exports = Accessibility;
