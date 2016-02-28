'use strict';

var meta = require('./package.json'),
    express = require('express'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    q = require('q'),
    path = require('path'),
    app = module.exports = express();

process.on('uncaughtException', function (err) {
    (app.get('logger') || console).error('Uncaught exception:\n', err.stack);
});

app.set('name', meta.name);
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.set('version', meta.version);
app.set('port', process.env.PORT || 5000);
app.set('views', path.join(__dirname, 'public', 'tpl'));
app.use(express.static(__dirname + '/public'));
app.set('logger', console);
app.enable('trust proxy');

app.get('*', function (req, res) {
    res.redirect(301, '/v3.1/index.html');
});

if (require.main === module) {
    app.listen(app.get('port'), function () {
        console.log('[%s] Express server listening on port %d',
            app.get('env').toUpperCase(), app.get('port'));
    });
}
