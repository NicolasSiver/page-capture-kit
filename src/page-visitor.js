const Promise   = require('bluebird'),
      puppeteer = require('puppeteer');

const {Context}      = require('./context'),
      ContextActions = require('./model/context-actions');

class PageVisitor {
    constructor(outputPath) {
        this.outputPath = outputPath;
        this.steps = 0;
    }

    createPayload() {
        return {
            step: this.steps++
        };
    }

    interactWithPage(page, script, browser) {
        return Promise
            .resolve()
            .then(() => script.visit(this.createPayload(), new Context(this.outputPath).initWithPage(page)))
            .then(action => {
                switch (action) {
                    case ContextActions.NEXT:
                        return Promise
                            .resolve()
                            .then(() => page.waitForNavigation())
                            .then(() => this.interactWithPage(page, script, browser));
                    case ContextActions.END:
                        return browser.close();
                }
            });
    }

    executeWithScript(script) {
        return Promise
            .resolve()
            .then(() => puppeteer.launch())
            .then(browser => {
                return browser
                    .newPage()
                    .then(page => this.interactWithPage(page, script, browser));
            });
    }

}

module.exports = {PageVisitor};
