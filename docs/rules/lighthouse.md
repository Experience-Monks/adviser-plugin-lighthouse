# Lighthouse

It will throw an error if the site does not meet or pass the supplied score threshold.

Use the adviser argument `--verbose` for extra information to see which specific areas failed.

## Syntax

```
{
  "plugins": ["lighthouse"],
  "lighthouse": {
    "url": "https://google.com",
  },
  "rules": {
    "lighthouse/performance": ["error", {"score": 0.9}],
    "lighthouse/accessibility": ["error", {"score": 0.9}],
    "lighthouse/seo": ["error", {"score": 0.9}],
    "lighthouse/best-practices": ["error", {"score": 0.9}],
    "lighthouse/pwa": ["error", {"score": 0.5}],
  }
}
```

The rule `lighthouse` requires a `url` passed in as a setting, and a `score` passed in for each lighthouse category.

### url

URL formatted string, this can be a live url or a local url.

Required

### score

float value. Each key (lighthoust/*) corresponds to the lighthouse audit section. The rule will ensure the section score meets or surpasses the provided float value or otherwise throw and error.

Default Value:
```
0.8
```

Example:
```
{
  "lighthouse/performance": ["error", {"score": 0.9}]
}
```