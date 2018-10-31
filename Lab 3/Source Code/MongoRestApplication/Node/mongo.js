/**
 * Created by user on 23/10/2016.
 */
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var bodyParser = require("body-parser");
var express = require('express');
var cors = require('cors');
var app = express();
var resultF = "";

var url = 'mongodb://ika:ikaika1@ds135993.mlab.com:35993/cs5551icp9';

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.post('/add', function (req, res) {
    MongoClient.connect(url, function(err, client) {
        if(err)
        {
            res.write("Failed, Error while connecting to Database");
            res.end();
        }
        var db = client.db("cs5551icp9");


        insertDocument(db, req.body, function() {
            res.write("Successfully inserted");
            res.end();
        });

    });
})
app.get('/search', function (req, res) {
    MongoClient.connect(url, function(err, client) {
        if(err)
        {
            res.write("Failed, Error while connecting to Database");
            res.end();
        }
        var db = client.db("cs5551icp9");

        var majorS = req.query.major;
        searchDocument(db,majorS,function () {
            if(resultF != "") {
                res.status(200).send(resultF);
            }
            else{
            }
            res.end();
        }  );
    });
})
var insertDocument = function(db, data, callback) {
    db.collection('Cars').insertOne( data, function(err, result) {
        if(err)
        {
            res.write("Registration Failed, Error While Registering");
            res.end();
        }
        console.log("Number of records inserted: ");
        callback();
    });
};
var searchDocument = function (db,data,callback) {
    db.collection('Cars').find({plate: data}).toArray(function(err, result) {
        if (err) throw err;
        resultF = result;
        console.log(result);
        callback();
    });
}
var server = app.listen(8081,function () {
    var host = server.address().address
    var port = server.address().port
    console.log("Example app listening at http://%s:%s", host, port)
})