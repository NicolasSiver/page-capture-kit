const Promise = require('bluebird');

class Authentication {
    constructor(page) {
        this.page = page;
        this.twoStep = false;

        // Designed to work with simple CSS Selectors or XPath
        this.usernameStrategies = [
            // Hulu
            '#email_id',

            // Netflix
            '#id_userLoginId',

            // Disney Plus
            '#email',

            // Amazon
            '#ap_email'
        ];

        this.passwordStrategies = [
            // Hulu
            '#password_id',

            // Netflix
            '#id_password',

            // Disney Plus
            '#password',

            // Amazon
            '#ap_password'
        ];
    }

    execute(username, password) {
        return Promise
            .resolve()
            .then(() => this.page.waitFor(800))
            .then(() => this.findElement(this.usernameStrategies))
            .then(inputElement => {
                if (inputElement === null) {
                    return Promise.reject('The automatic lookup for the authentication form has failed. Reason: username input was not found.');
                } else {
                    return Promise
                        .resolve()
                        .then(() => {
                            console.log('Username field is found. Typing provided username...');
                            return inputElement.type(username);
                        })
                        .then(() => inputElement.press('Enter'));
                }
            })
            .then(() => this.page.waitFor(800))
            .then(() => this.findElement(this.passwordStrategies))
            .then(inputElement => {
                if (inputElement === null) {
                    return Promise.reject('The automatic lookup for the authentication form has failed. Reason: password input was not found.');
                } else {
                    return Promise
                        .resolve()
                        .then(() => {
                            console.log('Password field is found. Typing provided password...');
                            return inputElement.type(password);
                        })
                        .then(() => {
                            return Promise
                                .all([
                                    this.page.waitForNavigation(),
                                    inputElement.press('Enter')
                                ])
                                .then(() => console.log('Authenticated.'));
                        })
                }
            });
    }

    findElement(selectors) {
        return Promise
            .resolve()
            .then(() => {
                return Promise.any(this.startSearch(selectors))
            });
    }

    setTwoStep(value) {
        this.twoStep = value;
        return this;
    }

    startSearch(strategies) {
        return strategies.map(strategy => {
            return Promise
                .resolve()
                .then(() => strategy.startsWith('//') === true ? this.page.waitForXPath(strategy) : this.page.waitForSelector(strategy))
                .then(element => {
                    if (element === null) {
                        return Promise.reject(`Element with selector "${strategy}" is not found.`);
                    } else {
                        return element;
                    }
                });
        });
    }

}

module.exports = {Authentication};
