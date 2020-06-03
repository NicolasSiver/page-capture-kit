#!/usr/bin/env node

const Promise   = require('bluebird'),
      parseArgs = require('minimist');

const {CaptureKit} = require('./capture-kit'),
      {version}    = require('../package');

Promise
    .resolve()
    .then(() => console.log(`Page Capture Kit, ver. ${version}`))
    .then(() => {
        let args = parseArgs(process.argv);
        let captureKit = new CaptureKit();

        captureKit.setOutput(args.output);

        return captureKit.play(args.scripts);
    });
