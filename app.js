
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , website = require('./routes/embed')
  , http = require('http')
  , path = require('path')
  , less = require("less-middleware");

var app = express();

if (app.get("env") === "development") {
  app.use(less({
    dest: __dirname + "/public/css",
    src: __dirname + "/public/less",
    prefix: "/css",
    compress: true,
    force: true,
  }));
}

// all environments
app.set('port', process.env.PORT || 4000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/embed', require('./routes/embed').embed);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});