# Lighthouse

It will throw an error if the site does not meet or pass the supplied score threshold.

Use the adviser argument `--verbose` for extra information to see which specific areas failed.

## Syntax

```
"lighthouse/lighthouse": {"url": "https://google.com", "scores": {
  "performance": 0.90,
  "accessibility" 0.90,
  "seo": 0.90,
  "best-practices:" 0.90,
  "pwa" 0.50
}} 
```

The rule `lighthouse` may receive two arguments: `url` and `scores`.

### url

URL formatted string, this can be a live url or a local url.

Required

### scores

Object with string / float pairs. Each key corresponds to the lighthouse audit section. The rule will ensure the section score meets or surpasses the provided float value or otherwise throw and error.

Default Value:
```
{
  "performance": 0.8,
  "accessibility": 0.8,
  "best-practices": 0.8,
  "seo": 0.8,
  "pwa": 0
}
```

Example:
```
{
  "performance": 0.90,
  "accessibility" 0.90,
  "seo": 0.90,
  "best-practices:" 0.90,
  "pwa" 0.50
}
```