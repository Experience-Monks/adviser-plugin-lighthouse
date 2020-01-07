# Lighthouse Audits

It will throw an error if the site does not meet or pass the supplied individual lighthouse audits scores.

Use the adviser argument `--verbose` for extra information to see which specific areas failed.

## Syntax

```
  "lighthouse/audits": [
    "error",
    {
      "mainthread-work-breakdown": 1,
      "image-aspect-ratio": 1,
      "not-a-valid-audit": 1
    }
  ]
```

### Options

Object with string / float pairs. Each key corresponds to the lighthouse audit item. The rule will ensure the audit score meets or surpasses the provided float value or otherwise throw and error.

Example:
```
{
  "viewport": 1,
  "without-javascript": 1,
  "first-contentful-paint": 0.9,
  "first-meaningful-paint": 0.9,
  "load-fast-enough-for-pwa": 1,
  "estimated-input-latency": 1,
  "total-blocking-time": 0.9,
  "max-potential-fid": 0.8,
  "errors-in-console": 1,
  "time-to-first-byte": 1,
  "first-cpu-idle": 0.9,
  "interactive": 0.9,
  "redirects": 1
}
```
