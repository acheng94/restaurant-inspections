var express = require('express')
var app = express()
var path = require('path')

var mysql = require('mysql');
var connection = mysql.createConnection({
                                        host     : 'upenn550projectspring18group10.cgmy1onltzol.us-east-2.rds.amazonaws.com',
                                        user     : 'Group10',
                                        password : 'Yelphealth100',
                                        database : 'yelp_db'
                                        });

/*var connection = mysql.createConnection({
                                        host     : 'fling.seas.upenn.edu',
                                        user     : 'acheng94',
                                        password : 'cis550password',
                                        });*/

app.set('port', (process.env.PORT || 5000))
app.use(express.static(__dirname + '/public'))


/*****************************************************************************************
 * SQL QUERIES
 *****************************************************************************************/

app.get('/show_tables', function(request, response) {
    var query = 'SHOW TABLES';
    connection.query(query, function (error, results, fields) {
    if (error) throw error;
      console.log(results);
      response.json(results);
    });
})

app.get('/business_table', function(request, response) {
    var query = 'SELECT * FROM business';
    connection.query(query, function (error, results, fields) {
    if (error) throw error;
      console.log(results);
      response.json(results);
    });
})

app.get('/inspdate_table', function(request, response) {
    var query = 'SELECT * FROM inspectdate';
    connection.query(query, function (error, results, fields) {
    if (error) throw error;
      console.log(results);
      response.json(results);
    });
})

app.get('/health_table', function(request, response) {
    var query = 'SELECT * FROM healthinspect';
    connection.query(query, function (error, results, fields) {
    if (error) throw error;
      console.log(results);
      response.json(results);
    });
})

/*** temporary function for easy testing, delete eventualy, because it is insecure ***/
app.get('/sql/:values', function(request, response) {
  var query = 'SELECT ' + request.params.values;
  connection.query(query, function (error, results, fields) {
    if (error) {
      response.send(error.sqlMessage);
    } else {
      console.log(results);
      response.json(results);
    }
  });
})

/*****************************************************************************************
 * HTML
 *****************************************************************************************/

app.get('/', function(request, response) {
  response.sendFile(path.join(__dirname, '/', 'html/index.html'));
})

app.get('/search', function(request, response) {
  response.sendFile(path.join(__dirname, '/', 'html/search.html'));
})

app.get('/ranking', function(request, response) {
  response.sendFile(path.join(__dirname, '/', 'html/ranking.html'));
})

app.get('/restaurant', function(request, response) {
  response.sendFile(path.join(__dirname, '/', 'html/restaurant.html'));
})

app.get('/detail', function(request, response) {
  response.sendFile(path.join(__dirname, '/', 'html/detail.html'));
})

/*****************************************************************************************
 * JS
 *****************************************************************************************/

app.get('/search.js', function(request, response) {
  response.sendFile(path.join(__dirname, '/', 'js/search.js'));
})

app.get('/ranking.js', function(request, response) {
  response.sendFile(path.join(__dirname, '/', 'js/ranking.js'));
})

app.get('/restaurant.js', function(request, response) {
  response.sendFile(path.join(__dirname, '/', 'js/restaurant.js'));
})

app.get('/detail.js', function(request, response) {
  response.sendFile(path.join(__dirname, '/', 'js/detail.js'));
})

/*****************************************************************************************
 * Listening
 *****************************************************************************************/

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'))
})
