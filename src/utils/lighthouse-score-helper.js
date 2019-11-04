class LighthouseScoreHelper {
  constructor(category, lighthouseResults, expectedScore, expectedAudits) {
    this.category = category;
    this.lighthouseResults = lighthouseResults;
    this.expectedScore = expectedScore;
    this.expectedAudits = expectedAudits;
  }

  run(sandbox) {
    const categories = this.lighthouseResults.categories;

    if (
      this.expectedScore !== undefined &&
      this.isLowerCategoryScore(categories[this.category].score, this.expectedScore)
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
        report['verbose'] = `Failed audits:${verboseOutput}`;

        sandbox.report(report);
      }
    }
  }

  isLowerCategoryScore(score, expectedScore) {
    return score < expectedScore;
  }

  getFailedAudits(lighthouseAudits, configAudits) {
    // Not checking if the audit belongs to the category to avoid O(n^2) performance hit
    const failedAudits = [];
    Object.keys(configAudits).forEach(audit => {
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
    });
    return failedAudits;
  }
}

module.exports = LighthouseScoreHelper;
