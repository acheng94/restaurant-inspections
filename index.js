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

app.get('/detail_yelp/:values', function(request, response) {
  var query = 'SELECT * FROM business WHERE id=' + '\'' + request.params.values + '\'';
  connection.query(query, function (error, results, fields) {
    if (error) {
      response.send(error.sqlMessage);
    } else {
      console.log(results);
      response.json(results);
    }
  });
})

app.get('/detail_insp/:values', function(request, response) {
  var query = 'SELECT * FROM (SELECT id,demerits,grade,violations FROM (SELECT name,address FROM business WHERE id=' + '\'' + request.params.values + '\'' + ') baddr JOIN healthinspect h ON (baddr.name LIKE CONCAT(\'%\', h.restaurantname, \'%\') OR h.restaurantname LIKE CONCAT(\'%\', baddr.name, \'%\')) AND (baddr.address LIKE CONCAT(\'%\', h.address, \'%\') OR h.address LIKE CONCAT(\'%\', baddr.address, \'%\'))) insp JOIN inspectdate dt ON insp.id=dt.id ORDER BY dt.inspectiondate DESC';
  connection.query(query, function (error, results, fields) {
    if (error) {
      response.send(error.sqlMessage);
    } else {
      console.log(results);
      response.json(results);
    }
  });
})

app.get('/detail_vio/:values', function(request, response) {
  var query = 'SELECT violation,`Violation Description` FROM (SELECT DISTINCT violation FROM (SELECT h.id FROM (SELECT name,address FROM business WHERE id=' + '\'' + request.params.values + '\'' + ') baddr JOIN healthinspect h ON (baddr.name LIKE CONCAT(\'%\', h.restaurantname, \'%\') OR h.restaurantname LIKE CONCAT(\'%\', baddr.name, \'%\')) AND (baddr.address LIKE CONCAT(\'%\', h.address, \'%\') OR h.address LIKE CONCAT(\'%\', baddr.address, \'%\'))) hids JOIN inspection_violations v ON hids.id=v.id) vids LEFT JOIN codes c ON violation=`Violation Id` ORDER BY violation ASC';
  connection.query(query, function (error, results, fields) {
    if (error) {
      response.send(error.sqlMessage);
    } else {
      console.log(results);
      response.json(results);
    }
  });
})

/*** Return list of restaurants for a search term ***/
app.get('/get_restaurants/:values', function(request, response) {
    var query = 'select all_dates.id, all_dates.name, all_dates.address, all_dates.stars, \
                  max(all_dates.idate) as most_recent_inspection, \
                  all_dates.grade as grade, all_dates.review_count as review_count \
                  from ( \
                        select r.id as id, r.name as name, r.address as address, r.stars as stars, i.inspectiondate as idate, i.grade as grade, r.review_count as review_count \
                            from restaurants r \
                            join inspections i \
                            on r.address = i.address \
                            and LOCATE(r.name, i.restaurantname) > 0 \
                            group by id, name, address, stars, inspectiondate, grade) all_dates \
                    where all_dates.name like "%' + request.params.values + '%" \
                    group by all_dates.id, all_dates.name, all_dates.address, all_dates.stars \
                    order by review_count desc \
                    limit 10';
  connection.query(query, function (error, results, fields) {
    if (error) {
      response.send(error.sqlMessage);
    } else {
      console.log(results);
      response.json(results);
    }
  });
})

/*** Return list of top 10 restaurants for a neighborhood ***/
app.get('/get_rankings/:values', function(request, response) {
  var query = 'select withdate.id, withdate.name, withdate.grade, withdate.address, withdate.stars, withdate.demerits from \
                (select distinct r.id as id, r.name as name, r.address as address, r.stars as stars, md.demerits as demerits, i.grade as grade, max(i.inspectiondate) as idate \
                from restaurants r \
                join inspections i \
                on r.address = i.address \
                join max_demerits md \
                on md.ID = i.id \
                and LOCATE(r.name, i.restaurantname) > 0 \
                where r.neighborhood like "%' + request.params.values + '%" \
                group by name, address, stars, demerits \
                order by demerits) withdate \
                limit 10';


  // var query = 'select withdate.id, withdate.name, withdate.address, withdate.stars, withdate.demerits from \
  //               (select distinct r.id as id, r.name as name, r.address as address, r.stars as stars, md.demerits as demerits, max(i.inspectiondate) as idate \
  //               from restaurants r \
  //               join inspections i \
  //               on r.address = i.address \
  //               join max_demerits md \
  //               on md.ID = i.id \
  //               and LOCATE(r.name, i.restaurantname) > 0 \
  //               where r.neighborhood like "%' + request.params.values + '%" \
  //               group by name, address, stars, demerits \
  //               order by demerits) withdate \
  //               limit 10';
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

app.get('/detail/', function(request, response) {
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
 * CSS
 *****************************************************************************************/

app.get('/content.css', function(request, response) {
  response.sendFile(path.join(__dirname, '/', 'css/content.css'));
})

/*****************************************************************************************
 * Images
 *****************************************************************************************/

app.get('/templogo.png', function(request, response) {
  response.sendFile(path.join(__dirname, '/', 'images/templogo.png'));
})

/*****************************************************************************************
 * Listening
 *****************************************************************************************/

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'))
})
