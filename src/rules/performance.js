'use strict';

const BaseRule = require('./base-rule');
const CATEGORY_KEY = 'performance';

class Performance extends BaseRule {
  constructor(context) {
    super(context, CATEGORY_KEY);
  }
}

Performance.meta = {
  category: 'general',
  description: 'Runs performance lighthouse audits on provided URL',
  recommended: true,
  docsUrl: 'https://github.com/jam3/adviser-plugin-lighthouse/tree/master/docs/rules/lighthouse.md'
};

module.exports = Performance;
