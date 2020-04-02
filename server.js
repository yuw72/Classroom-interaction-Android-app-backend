const { MongoClient } = require('mongodb');
var bcrypt = require('bcrypt');
var express = require('express');
var bodyParser = require('body-parser');


const uri = "mongodb+srv://jerry:wangyuchao@cluster0-svqgx.mongodb.net/test?retryWrites=true&w=majority";


const client = new MongoClient(uri);

try {
    client.connect();
    console.log("connect to database---");
} catch (e) {
    console.error(e);
}


async function listDatabases(client) {
    databasesList = await client.db().admin().listDatabases();

    console.log("Databases:");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};

const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

var express = require('express');
var app = express();

// support parsing of application/json type post data
app.use(bodyParser.json());

//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));
app.route('/').get(function (req, res) {
    // res.statusCode = 200
    // res.setHeader('Content-Type', 'text/plain');
    // console.log(client);

    res.send("Hello my love");
});

app.route('/register').post(function (req, res) {
    // res.statusCode = 200
    var body = req.body

    if (!("username" in body) || !("password" in body)) {
        res.send("send a wrong variable name");
    }
    var username = body['username'];
    var password = body['password'];
    var passwordHash = 0;
    var dbObject = client.db("downhat");
    var query = { "username": username };
    dbObject.collection("authentification").find(query).toArray(function (err, result) {
        if (err) throw err;
        // console.log(result);
        if (result.length == 0) {
            // send a status
            var salt = bcrypt.genSaltSync(10);
            console.log(salt);
            passwordHash = bcrypt.hashSync(password, salt);
            console.log(passwordHash);

            var myobj = { "username": username, "password": passwordHash };
            dbObject.collection("authentification").insertOne(myobj, function (err, res) {
                if (err) throw err;
            });
            res.send("registered successfully");
        } else {
            // send a status
            res.send("Username has already been registered");
        }
    });
});

app.route('/login/:username/:password').get(function (req, res) {

    var username = req.params.username;
    var password = req.params.password;

    var dbObject = client.db("downhat");
    var query = { "username": username };

    dbObject.collection("authentification").find(query).toArray(function (err, result) {
        if (err) throw err;
        // console.log(result);
        if (result.length == 0) {
            // send a status response
            console.log("no username and password");
            res.send("no username and password");
        } else {
            // send a status
            var true_password = result[0]["password"];
            if (bcrypt.compareSync(password, true_password)) {
                // Passwords match
                console.log("successfully login");
                res.send("sucessfully login");
            } else {
                // Passwords don't match
                console.log("no username and password");
                res.send("no username and password");
            }

        }
    });
});

app.route('/Angular').get(function (req, res) {
    res.send("Tutorial on Angular");
});
app.get('/', function (req, res) {
    res.send('Welcome to Guru99 Tutorials');
});

app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});

