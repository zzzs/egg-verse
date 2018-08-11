'use strict';

module.exports = () => {
    return async function(ctx, next) {
        if (!ctx.user) {
            return await next();
            ctx.redirect('/login');
            return;
        }
        await next();
    }
}
