'use strict';

module.exports = () => {
    return async function(ctx, next) {
        ctx.locals.cur_user = null;
        let user = ctx.user;

        if (!user) {
            return await next();
        }
        ctx.locals.cur_user = user;
        await next();
    }
}
