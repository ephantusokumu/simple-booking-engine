module.exports = (req, res, next) => {
    req.rawBody = '';
    req.on('data', chunk => {
        req.rawBody += chunk.toString();
    });
    req.on('end', () => next());
};