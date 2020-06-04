const Promise = require('bluebird'),
      format  = require('date-fns/format'),
      path    = require('path');

const {Authentication} = require('./challenges/authentication'),
      ContextActions   = require('./model/context-actions');

class Context {
    constructor(outputPath) {
        this.outputPath = outputPath;
    }

    capture(fileName, pattern = 'yyyy-MM-dd--HH-mm-ss') {
        let name = `${fileName}-${format(new Date(), pattern)}.png`;

        return () => {
            return Promise
                .resolve()
                .then(() => this.page.screenshot({
                    fullPage: true,
                    path    : path.resolve(this.outputPath, name),
                    type    : 'png'
                }));
        };
    }

    click(selector, navigation = true) {
        return () => {
            return Promise.all([
                navigation === true ? this.page.waitForNavigation({waitUntil: ['networkidle2']}) : Promise.resolve(),
                this.getElementBySelector(selector).then(element => element.click())
            ]);
        };
    }

    end() {
        return () => ContextActions.END;
    }

    getElementBySelector(selector) {
        let result;

        if (typeof selector === 'string') {
            if (selector.startsWith('//') === true) {
                result = this.page.waitForXPath(selector);
            } else {
                result = this.page.waitForSelector(selector);
            }
        } else {
            result = Promise.resolve(selector);
        }

        return result;
    }

    hover(selector) {
        return () => this.getElementBySelector(selector).then(element => element.hover());
    }

    initWithPage(page) {
        this.page = page;

        return this;
    }

    login(username, password, twoStep = false) {
        return () => {
            return Promise
                .resolve()
                .then(() => {
                    return new Authentication(this.page)
                        .setTwoStep(twoStep)
                        .execute(username, password);
                });
        };
    }

    next() {
        return () => ContextActions.NEXT;
    }

    open(url) {
        return () => {
            console.log('Visiting URL: ' + url);
            return this.page.goto(url, {waitUntil: ['load', 'domcontentloaded', 'networkidle2']});
        };
    }

    series(...actions) {
        let chain = Promise.resolve();

        actions.forEach(action => {
            chain = chain.then(() => action());
        });

        return chain;
    }

    wait(condition) {
        return () => {
            return this.page.waitFor(condition);
        };
    }
}

module.exports = {Context};
