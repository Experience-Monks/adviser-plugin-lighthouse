# Lighthouse Scores

It will throw an error if the site does not meet or pass the supplied lighthouse scores.

Use the adviser argument `--verbose` for extra information to see which specific areas failed.

## Syntax

```
  "lighthouse/scores": [
    "error",
    {
      "best-practices": 1,
      "pwa": 1,
      "seo": 1,
      "accessibility": 1,
      "performance": 1
    }
  ]
```

The rule `scores` may receive the lighthouse categories as arguments with the minimum required score.

### Options

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
