const Promise = require('bluebird'),
      path    = require('path');

const {Authentication} = require('./challenges/authentication'),
      ContextActions   = require('./model/context-actions');

class Context {
    constructor(outputPath) {
        this.outputPath = outputPath;
    }

    capture(fileName) {
        return Promise
            .resolve()
            .then(() => this.page.screenshot({
                fullPage: true,
                path    : path.resolve(this.outputPath, fileName),
                type    : 'png'
            }));
    }

    click(selector) {
        let clickHandler;

        if (typeof selector === 'string') {
            if (selector.startsWith('//') === true) {
                clickHandler = this.page.$x(selector);
            } else {
                clickHandler = this.page.$(selector);
            }
        } else {
            clickHandler = selector;
        }

        return Promise.all([
            this.page.waitForNavigation(),
            clickHandler.click()
        ]);
    }

    end() {
        return ContextActions.END;
    }

    initWithPage(page) {
        this.page = page;

        return this;
    }

    login(username, password) {
        return Promise
            .resolve()
            .then(() => new Authentication(this.page).execute(username, password));
    }

    next() {
        return ContextActions.NEXT;
    }
}

module.exports = {Context};
