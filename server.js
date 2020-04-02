const {MongoClient} = require('mongodb');
var express = require('express');
var bodyParser = require('body-parser');


async function main(){
    /**
     * Connection URI. Update <username>, <password>, and <your-cluster-url> to reflect your cluster.
     * See https://docs.mongodb.com/ecosystem/drivers/node/ for more details
     */
    const uri = "mongodb+srv://jerry:wangyuchao@cluster0-svqgx.mongodb.net/test?retryWrites=true&w=majority";
 

    const client = new MongoClient(uri);
 
    try {
        // Connect to the MongoDB cluster
        await client.connect();
 
        // Make the appropriate DB calls
        await  listDatabases(client);
 
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}

async function listDatabases(client){
    databasesList = await client.db().admin().listDatabases();
 
    console.log("Databases:");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};

const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

// const server = http.createServer((req, res) => {
//   res.statusCode = 200;
//   res.setHeader('Content-Type', 'text/plain');
//   res.end('Hello World\n');
// });

var express = require('express');
var app = express();

// support parsing of application/json type post data
app.use(bodyParser.json());

//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));
app.route('/').get(function(req,res)
{
    // res.statusCode = 200
    // res.setHeader('Content-Type', 'text/plain');
    res.send("Hello my love");
});

app.route('/posts').post(function(req,res)
{
    // res.statusCode = 200
    var body = req.body
    var text = '';
    for (var key in body) {
        text += 'Index is: ' + key + '\nDescription is:  ' + body[key]
    }
    res.setHeader('Content-Type', 'text/plain');
    console.log("Got a response: ", text);
    res.end(JSON.stringify({ "name": "you did it" }));
});

app.route('/Node').get(function(req,res)
{
    res.statusCode = 200;
    res.send("Tutorial on Node");
});
app.route('/Angular').get(function(req,res)
{
    res.send("Tutorial on Angular");
});
app.get('/',function(req,res){
    res.send('Welcome to Guru99 Tutorials');
});

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
main().catch(console.error);
