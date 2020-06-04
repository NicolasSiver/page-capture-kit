class Netflix {
    // Call for authentication form and login
    step0(context) {
        return context.series(
            context.open('https://www.netflix.com/login'),
            context.login(process.env.USERNAME_NETFLIX, process.env.PASSWORD_NETFLIX),
            context.next()
        );
    }

    // Capture Billing
    step1(context) {
        return context.series(
            context.open('https://www.netflix.com/billingactivity'),
            context.capture('Netflix'),
            context.end()
        )
    }

    visit({step}, context) {
        return this['step' + step](context);
    }
}

module.exports = Netflix;
