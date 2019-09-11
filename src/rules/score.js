'use strict';

const Adviser = require('adviser');

class Score extends Adviser.Rule {
  run(sandbox) {
    const results = this.context.shared;
    if (!results) {
      throw new Error('No results returned.');
    }
    const score = this.context.options.score || 0.8;
    const key = sandbox.ruleName.replace('lighthouse/', '');
    if (results.categories[key].score < this.context.options.score) {
      sandbox.report({
        message: `${key}: score ${results.categories[key].score} is below required ${score}`
      });
    }
  }
}

Score.meta = {
  category: 'general',
  description: 'Runs lighthouse audits on provided URL and ensures score is above provided threshold',
  recommended: true,
  docsUrl: 'https://github.com/jam3/adviser-plugin-lighthouse/tree/master/docs/rules/lighthouse.md'
};

module.exports = Score;
