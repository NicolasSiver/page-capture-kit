class DisneyPlus {
    // Call for authentication form and login
    step0(context) {
        return context.series(
            context.open('https://www.disneyplus.com/login'),
            context.login(process.env.USERNAME_DISNEY_PLUS, process.env.PASSWORD_DISNEY_PLUS),
            context.next()
        );
    }

    // Capture Billing
    step1(context) {
        return context.series(
            context.open('https://www.disneyplus.com/account/billing-history'),
            context.capture('Disney-Plus'),
            context.end()
        )
    }

    visit({step}, context) {
        return this['step' + step](context);
    }
}

module.exports = DisneyPlus;
