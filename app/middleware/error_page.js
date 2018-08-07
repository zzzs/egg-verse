'use strict';

module.exports = () => {
    return async function(ctx, next) {
        await next();
        if (ctx.status === 403) {
            return await ctx.render('error_page', {errormsg: ctx.errormsg});
        }
    }
}

