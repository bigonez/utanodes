const requestlogger = function (req, res, next) {
    next();
    // Log a message for each incoming request and outgoing response
    var statusXHR = (req.header('Sec-Fetch-Mode') == 'cors') ? ' :: XHR' : '';
    console.log(`. ${req.method} ${req.url} ${res.statusCode} ${res.getHeader('Content-Length') || res._contentLength}${statusXHR}`);
};

module.exports = requestlogger;
