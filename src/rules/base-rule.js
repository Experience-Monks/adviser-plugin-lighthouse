'use strict';

const Adviser = require('adviser');
const isNumber = require('is-number');

class BaseRule extends Adviser.Rule {
  constructor(context, category) {
    super(context);
    this.category = category;

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
    const categories = this.lighthouseResults.categories;

    if (
      this.expectedScore !== undefined &&
      categories[this.category].score < this.expectedScore
    ) {
      sandbox.report({
        message: `${this.category} score ${categories[this.category].score} is below required ${this.expectedScore}`
      });
    }

    if (this.expectedAudits) {
      const failedAudits = this.getFailedAudits(this.lighthouseResults.audits, this.expectedAudits);

      if (failedAudits.length > 0) {
        const report = {
          message: `${failedAudits.length} ${this.category} lighthouse audit${
            failedAudits.length > 1 ? 's' : ''
          } failed`
        };

        let verboseOutput = '\n';
        failedAudits.forEach((audit, index) => {
          verboseOutput += `  - ${audit.id}: ${audit.expectedScore} (expected)  |  ${audit.score} (current)`;
          verboseOutput += index <= failedAudits.length - 2 ? '\n' : '';
        });
        report.verbose = `Failed audits:${verboseOutput}`;

        sandbox.report(report);
      }
    }
  }

  getFailedAudits(lighthouseAudits, configAudits) {
    return Object.keys(configAudits).map(audit => {
      if (
        lighthouseAudits[audit] &&
        lighthouseAudits[audit].score !== null &&
        lighthouseAudits[audit].score < configAudits[audit]
      ) {
        failedAudits.push({
          id: audit,
          expectedScore: configAudits[audit],
          score: lighthouseAudits[audit].score
        });
      }
    }).filter(Boolean);
  }
}

module.exports = BaseRule;
