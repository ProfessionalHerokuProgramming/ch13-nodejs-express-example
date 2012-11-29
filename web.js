// web.js

var express = require('express');

var app = express.createServer(express.logger());

app.get(
    '/', function(request, response) {

        var pg = require('pg');
        
        // Connect to the DB
        pg.connect(
            process.env.DATABASE_URL, function(err, client) {

                if (err) {
                    // Output error to console if can't connect
                    console.log(err);
                    
                } else {
                
                    // Get all employees
                    client.query(
                        'SELECT id, name, email FROM employees', function(err, result) {

                            response.writeHead(200, {'Content-Type': 'text/html'});
                            response.write('<h1>Employee List</h1>');
                    
                            response.write('<table>' +
                                '<tr>' +
                                '    <th>Id</th>' +
                                '    <th>Name</th>' +
                                '    <th>E-mail</th>' +
                                '</tr>'
                            );

                            // Output each row of result
                            for (var i = 0; i < result.rows.length; i++) {
                            
                                response.write('<tr>' +
                                    '    <td>' + result.rows[i].id + '</td>' +
                                    '    <td>' + result.rows[i].name + '</td>' +
                                    '    <td>' + result.rows[i].email + '</td>' +
                                    '</tr>');
                            }
                            
                            response.write('</table>');
                            response.end();
                        }
                    );
                }
            }
        )
    }
);

var port = process.env.PORT || 5000;
app.listen(
    port, function() {
        console.log("Node.js server listening on " + port);
    }
);