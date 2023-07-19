export default (req, res, next) => {
    next();
    // Log a message for each incoming request and outgoing response
    const statusXHR = (req.header('Sec-Fetch-Mode') == 'cors') ? ' :: XHR' : '';
    const time = new Date();
    console.log(`[${time.toLocaleString('en-GB')}] ${req.method} ${req.originalUrl} ${res.statusCode} ${res.getHeader('Content-Length') || res._contentLength}${statusXHR}`);
};
