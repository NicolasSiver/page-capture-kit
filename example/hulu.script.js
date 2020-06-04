class Hulu {
    // Call for authentication form and login
    step0(context) {
        return context.series(
            context.open('https://auth.hulu.com/web/login?next=http://secure.hulu.com/account'),
            context.login(process.env.USERNAME_HULU, process.env.PASSWORD_HULU),
            context.next()
        );
    }

    // Open window with Billing History. Wait for history to load.
    step1(context) {
        return context.series(
            context.open('https://secure.hulu.com/account'),
            context.click('//*[@id="main-content"]/main/div/div/section[1]/div/div/div[2]/div/button', false),
            context.wait(2000),
            context.capture('Hulu'),
            context.end()
        )
    }

    visit({step}, context) {
        return this['step' + step](context);
    }
}

module.exports = Hulu;
