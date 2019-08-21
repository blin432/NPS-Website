// Dependencies
const express = require("express");
const mysql = require("mysql");

var PORT = 3002;

// Initialize Express
const app = express();

// Set up a static folder (public) for our web app
app.use(express.static("public"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Create connection
if (process.env.JAWSDB_URL) {
    var connection = mysql.createConnection(process.env.JAWSDB_URL);
}
else {
    var connection = mysql.createConnection({
        host: "localhost",
        port: 8889,
        user: "root",
        password: "root",
        database: "nps_db"
    });
}

connection.connect(function(err) {
    if (err) {
        console.error("error connecting: " + err.stack);
        return;
    }
    console.log("connected as id " + connection.threadId);
});

app.get("/select", function(req, res) {

    connection.query("SELECT * FROM selections;", function(err, data) {
        if (err) {
            return res.status(500).end();
        } else {
            // let html = buildCheck(data);
            // res.send(html);
        }
        res.json(data);
    });
});

app.put("/checked/:id", function(req, res) {
    connection.query("UPDATE selections SET checked = ? WHERE id = ?", [req.body.checked, req.body.id], function(err, result) {
        if (err) {
            // If an error occurred, send a generic server failure
            return res.status(500).end();
        }
        else if (result.changedRows === 0) {
            // If no rows were changed, then the ID must not exist, so 404
            return res.status(404).end();
        }
        res.status(200).end();
    });
});

// Start the server
app.listen(process.env.PORT || PORT, function() {
    console.log("App running on port " + PORT + "!");
});