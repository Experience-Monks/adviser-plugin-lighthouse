'use strict';

const path = require('path');
const fs = require('fs');

const requireIndex = require('requireindex');
const chromeLauncher = require('chrome-launcher');
const lighthouse = require('lighthouse');
const isURL = require('is-url');
const Adviser = require('adviser');

class LighthousePlugin extends Adviser.Plugin {
  constructor(settings) {
    super(settings);

    if (!Object.prototype.hasOwnProperty.call(settings, 'url') || !isURL(settings.url)) {
      throw new Error(`No valid url provided.`);
    }

    this.url = settings.url;
    this.options = settings.options || {};
    this.configPath = settings.configPath;
    this.rules = requireIndex(path.join(__dirname, '/rules'));
  }

  async preRun(context) {
    let config = null;

    if (this.configPath) {
      const fullConfigPath = path.join(context.filesystem.dirname, this.configPath);

      if (!fs.existsSync(fullConfigPath)) {
        throw new Error(`Config file was not found in ${fullConfigPath}`);
      }

      try {
        config = require(path.join(context.filesystem.dirname, this.configPath));
      } catch (error) {
        throw new Error(`Error found retrieving lighthouse config file ${fullConfigPath}`);
      }
    }

    try {
      const chromeOptions = { chromeFlags: ['--show-paint-rects'] };
      const chrome = await chromeLauncher.launch(chromeOptions);

      const options = { ...this.options, port: chrome.port };
      const results = await lighthouse(this.url, options, config);
      await chrome.kill();

      if (!results.lhr) {
        throw new Error('No results returned.');
      }

      context.addShareableData(results.lhr);
    } catch (error) {
      throw new Error(`Lighthouse couldn't run, ${error}`);
    }
  }
}

LighthousePlugin.meta = {
  description: 'Adviser plugin wrapper of lighthouse',
  recommended: true
};

module.exports = LighthousePlugin;
