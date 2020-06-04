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
            .then(() => {
                let payload = this.createPayload();
                let context = new Context(this.outputPath);

                console.log('Visiting page. Step: ' + payload.step);

                return script.visit(payload, context.initWithPage(page));
            })
            .then(action => {
                switch (action) {
                    case ContextActions.NEXT:
                        return this.interactWithPage(page, script, browser);
                    case ContextActions.END:
                        return browser.close();
                }
            });
    }

    executeWithScript(script) {
        return Promise
            .resolve()
            .then(() => {
                return puppeteer.launch({
                    headless       : false,
                    defaultViewport: {width: 1920, height: 1080}
                });
            })
            .then(browser => {
                return browser
                    .newPage()
                    .then(page => this.interactWithPage(page, script, browser));
            });
    }

}

module.exports = {PageVisitor};
