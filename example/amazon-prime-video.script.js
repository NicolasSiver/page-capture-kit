class AmazonPrimeVideo {
    // Call for authentication form and login
    step0(context) {
        return context.series(
            context.open('https://www.amazon.com/ap/signin?openid.pape.max_auth_age=0&openid.identity=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0%2Fidentifier_select&openid.assoc_handle=usflex&openid.mode=checkid_setup&openid.ns.pape=http%3A%2F%2Fspecs.openid.net%2Fextensions%2Fpape%2F1.0&openid.claimed_id=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0%2Fidentifier_select&pageId=usflex&openid.ns=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0'),
            context.login(process.env.USERNAME_AMAZON_PRIME_VIDEO, process.env.PASSWORD_AMAZON_PRIME_VIDEO),
            context.next()
        );
    }

    // All payments page
    step1(context) {
        return context.series(
            context.open('https://www.amazon.com/mc/payments'),
            context.capture('Amazon-Prime-Video'),
            context.end()
        )
    }

    visit({step}, context) {
        return this['step' + step](context);
    }
}

module.exports = AmazonPrimeVideo;
