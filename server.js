var express = require('express');
var app = express();

app.use(express.static('dist'));

app.get('/*', function(req, res) {
    
     var options = {
        root: __dirname + '/dist/'
    };
    
    res.sendFile('index.html', options);
});

app.listen(process.env.PORT || 8080);
console.log('8080 is the magic port');