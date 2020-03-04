const Utils = require('./Utils')

module.exports = async (req, res, routes) => {
    const route = routes.find(route => {
        //For each route, match case or return error
        const isMethodEqual = route.method === req.method;
        let pathMatch = false;
        // to get rid of '/' from the end of the url
        if (req.url.slice(-1) === '/') {
            req.url = req.url.substring(0, req.url.length - 1)
        }
        //check if path is matching either by RegEx or simple string
        pathMatch =
            typeof route.path === "object" ?
                req.url.match(route.path) : route.path === req.url;
        return pathMatch && isMethodEqual;
    });

    // get param for id
    let param = null;
    if (route && typeof route.path === 'object') {
        param = req.url.match(route.path)[1]
    }
    //check if I found a route that matches
    if (route) {
        let body = null;
        if (req.method === 'POST' || req.method === 'PUT') {
            body = await Utils.returnStringFromReadableStream(req)
        }
        return route.callback(req, res, body, param)
    } else {
        return Utils.returnError(res)
    }
}

