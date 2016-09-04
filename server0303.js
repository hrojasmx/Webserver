var express  = require('express');
var app = express();
var PORT = 3000;

/*
app.get('/', function(req, res) {
    res.send('hello express');
});
*/

var middleware =  {
    requireAuthentication : function(req, res, next){
        console.log('private hit');
        next();
    },
    logger : function(req, res, next) {
        console.log('Request: ' + new Date().toString() + req.method + ' ' + req.originalUrl);
        next();
    }
}

app.use(middleware.logger);

// app.use(middleware.requireAuthentication);

/*
app.get('/About', function(req, res) {
    res.send('about us!');
});
*/
app.get('/About', middleware.requireAuthentication, function(req, res) {
    res.send('about us');
});


//console.log(__dirname);
app.use(express.static(__dirname + '/' + 'public'));

app.listen(PORT, function(){
    console.log('Express server started on port ' + PORT + ' !');
});
