'use strict';

const BaseRule = require('./base-rule');
const CATEGORY_KEY = 'pwa';

class Pwa extends BaseRule {
  constructor(context) {
    super(context, CATEGORY_KEY);
  }
}

Pwa.meta = {
  category: 'general',
  description: 'Runs Progressive Web App lighthouse audits on provided URL',
  recommended: true,
  docsUrl: 'https://github.com/jam3/adviser-plugin-lighthouse/tree/master/docs/rules/lighthouse.md'
};

module.exports = Pwa;
