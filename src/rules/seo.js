'use strict';

const BaseRule = require('./base-rule');
const CATEGORY_KEY = 'seo';

class Seo extends BaseRule {
  constructor(context) {
    super(context, CATEGORY_KEY);
  }
}

Seo.meta = {
  category: 'general',
  description: 'Runs SEO lighthouse audits on provided URL',
  recommended: true,
  docsUrl: 'https://github.com/jam3/adviser-plugin-lighthouse/tree/master/docs/rules/lighthouse.md'
};

module.exports = Seo;
