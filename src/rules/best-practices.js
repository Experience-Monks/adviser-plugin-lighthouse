'use strict';

const BaseRule = require('./base-rule');
const CATEGORY_KEY = 'best-practices';

class BestPractices extends BaseRule {
  constructor(context) {
    super(context, CATEGORY_KEY);
  }
}

BestPractices.meta = {
  category: 'general',
  description: 'Runs best practices lighthouse audits on provided URL',
  recommended: true,
  docsUrl: 'https://github.com/jam3/adviser-plugin-lighthouse/tree/master/docs/rules/lighthouse.md'
};

module.exports = BestPractices;
