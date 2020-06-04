#!/usr/bin/env node

const Promise   = require('bluebird'),
      parseArgs = require('minimist');

const {CaptureKit} = require('./capture-kit'),
      {logger}     = require('./util/logger'),
      {version}    = require('../package');

Promise
    .resolve()
    .then(() => logger.log(`Page Capture Kit, ver. ${version}`))
    .then(() => {
        let args = parseArgs(process.argv);
        let captureKit = new CaptureKit();

        captureKit.setOutput(args.output);

        return captureKit.play(args.scripts);
    });
