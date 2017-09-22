var kue = require('kue');
var express = require('express');
var kueUiExpress = require('kue-ui-express');

var app = express();
app.set('port', 5000);

kue.createQueue();

kueUiExpress(app, '/', '/api');

// Mount kue JSON api
app.use('/api', kue.app);

app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
});