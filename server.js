// server.js
var express = require('express')
var path = require('path')

var app = express()

// serve our static stuff like index.css
app.use(express.static(__dirname))

// send all requests to index.html so browserHistory in React Router works
app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, 'src/index.html'))
})

app.set('port', (process.env.PORT || 8081)); 
app.listen(app.get('port'), function () {
    console.log('Server has started! http://localhost:' + app.get('port') + '/');
});
