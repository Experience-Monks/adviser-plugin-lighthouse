'use strict';

const Adviser = require('adviser');
const isNumber = require('is-number');

class Scores extends Adviser.Rule {
  constructor(context) {
    super(context);

    if (Object.keys(this.context.options).length === 0) {
      throw new Error(`You must include at least 1 category.`);
    }
    this.scores = this.context.options;
    if (!Object.values(this.scores).every(isNumber)) {
      throw new Error(`Scores must be defined as a number.`);
    }
    this.lighthouseResults = context.shared;
  }

  run(sandbox) {
    const categories = this.lighthouseResults.categories;
    Object.keys(this.scores).forEach(category => {
      if (categories[category] && categories[category].score < this.scores[category]) {
        sandbox.report({
          message: `${category} score ${categories[category].score} is below required ${this.scores[category]}`
        });
      }
    });
  }
}

Scores.meta = {
  category: 'general',
  description: 'Runs Progressive Web App lighthouse audits on provided URL',
  recommended: true,
  docsUrl: 'https://github.com/jam3/adviser-plugin-lighthouse/tree/master/docs/rules/lighthouse.md'
};

module.exports = Scores;
