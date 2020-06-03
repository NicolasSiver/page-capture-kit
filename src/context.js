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
        return Promise.all([
            this.page.waitForNavigation(),
            typeof selector === 'string' ? this.page.$(selector).click() : selector.click()
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
        let auth = new Authentication(this.page);

        return Promise
            .resolve()
            .then(() => auth.execute(username, password))
            .then(() => this.click(auth.getLoginButtonSelector()));
    }

    next() {
        return ContextActions.NEXT;
    }
}

module.exports = {Context};
