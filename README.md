# adviser-plugin-lighthouse

Plugin for adviser to run lighthouse audits and score checking on a given URL

- [Installation](#installation)
- [Usage](#usage)
- [Tests](#tests)
- [Contributing](#contributing)
- [Support](#support)
- [License](#license)

## Installation

You'll first need to install [Adviser](https://www.npmjs.com/package/adviser):

```
$ npm i adviser --save-dev
```

Next, install `adviser-plugin-lighthouse`:

```
$ npm install adviser-plugin-lighthouse --save-dev
```

**Note:** If you installed Adviser globally (using the `-g` flag) then you must also install `adviser-plugin-lighthouse` globally.

## Usage

Add `lighthouse` to the plugins section of your `.adviserrc` configuration file. You can omit the `adviser-plugin-` prefix:

```json
{
  "plugins": ["lighthouse"]
}
```

Then configure the rules you want to use under the rules section.

```json
{
  "rules": {
    "lighthouse/scores": [
      "error",
      {
        "best-practices": 1,
        "pwa": 0.8,
        "seo": 1,
        "accessibility": 1,
        "performance": 0.9
      }
    ],
  }
}
```

If you don't have a `.adviserrc` you can create one running `$ adviser --init`

### Full example

```
{
  "plugins": ["lighthouse"],
  "rules": {
    "lighthouse/scores": [
      "error",
      {
        "best-practices": 1,
        "pwa": 1,
        "seo": 1,
        "accessibility": 1,
        "performance": 1
      }
    ],
    "lighthouse/audits": [
      "error",
      {
        "mainthread-work-breakdown": 1,
        "not-a-valid-audit": 1
      }
    ]
  }
}
```

## Tests

If you would like to contribute and later on test your changes there are a couple ways explained below.

### Unit code

The package (`adviser-plugin-lighthouse`) is setup to run tests under the folder `__tests__` with Jest. Save your tests there and they will run before each code push and by travis once the PR is created.

### Integration tests

To run your rules with `adviser`, we recommend you to create an empty folder (We have one under `./examples/integration`) with:

- An example package.json
- An `adviser` configuration file. You can grab the example in this README or generate one using `$ adviser --init` (adviser must be installed globally or using `npx`)
- Link this repo to the example project.
  - Run `$ npm link` in the `adviser-plugin-lighthouse` root
  - Run `$ npm link adviser-plugin-lighthouse` in the example project root

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct, and the process for submitting
pull requests.

## Supported Rules

- [scores](docs/rules/scores.md) - Inspect the global lighthouse scores
- [audits](docs/rules/audits.md) - Inspect the individual lighthouse audits result

## License

[MIT](LICENSE)
