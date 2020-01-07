'use strict';

const Adviser = require('adviser');

class Audits extends Adviser.Rule {
  constructor(context) {
    super(context);
    this.audits = this.context.options;
    if (Object.keys(this.audits) === 0) {
      throw new Error(`Must include at least 1 required audit.`);
    }
    this.lighthouseResults = context.shared;
  }

  run(sandbox) {
    const failedAudits = this.getFailedAudits(this.lighthouseResults.audits, this.audits);
    const unknownAudits = this.getUnknownAudits(this.lighthouseResults.audits, this.audits);

    if (failedAudits.length > 0) {
      const report = {
        message: `${failedAudits.length} lighthouse audit${failedAudits.length > 1 ? 's' : ''} failed`
      };

      let verboseOutput = '\n';
      failedAudits.forEach((audit, index) => {
        verboseOutput += `  - ${audit.id}: ${audit.expected} (expected)  |  ${audit.score} (current)`;
        verboseOutput += index <= failedAudits.length - 2 ? '\n' : '';
      });
      report.verbose = `Failed audits:${verboseOutput}`;

      if (unknownAudits.length > 0) {
        report.verbose += `\n\n  Unknown Audits: \n  - ${unknownAudits.join('\n  - ')}`;
      }

      sandbox.report(report);
    }
  }

  getFailedAudits(lighthouseAudits, configAudits) {
    return Object.keys(configAudits)
      .map(audit => {
        if (
          lighthouseAudits[audit] &&
          lighthouseAudits[audit].score !== null &&
          lighthouseAudits[audit].score < configAudits[audit]
        ) {
          return {
            id: audit,
            expected: configAudits[audit],
            score: lighthouseAudits[audit].score
          };
        }
      })
      .filter(Boolean);
  }

  getUnknownAudits(lighthouseAudits, configAudits) {
    return Object.keys(configAudits)
      .map(audit => {
        if (!Object.prototype.hasOwnProperty.call(lighthouseAudits, audit)) {
          return audit;
        }
      })
      .filter(Boolean);
  }
}

Audits.meta = {
  category: 'general',
  description: 'Runs Progressive Web App lighthouse audits on provided URL',
  recommended: true,
  docsUrl: 'https://github.com/jam3/adviser-plugin-lighthouse/tree/master/docs/rules/lighthouse.md'
};

module.exports = Audits;
