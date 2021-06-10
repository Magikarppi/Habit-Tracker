"use strict";
const tokenExtractor = (request, _response, next) => {
    if (Object.getOwnPropertyNames(request.headers).includes('authorization')) {
        const authorization = request.get('authorization');
        if (authorization && authorization.toLowerCase().startsWith('bearer')) {
            const token = authorization.substring(7);
            Object.assign(request, { token });
            return;
        }
        else {
            return null;
        }
    }
    return next();
};
module.exports = {
    tokenExtractor,
};
