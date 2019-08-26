// Set up
var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var cors = require('cors');

// Configuration
//mongodb://localhost:27017/dll
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/dll");

app.use(bodyParser.urlencoded({'extended': 'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({type: 'application/vnd.api+json'}));
app.use(methodOverride());
app.use(cors());

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'DELETE, POST, PUT');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// Model
var Duluth = mongoose.model('Duluth', {
    email: String
});


// Get all Duluth items
app.get('/api/dll', function (req, res) {

    console.log("Listing email addresses...");

    //use mongoose to get all dll in the database
    Duluth.find(function (err, dll) {

        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        if (err) {
            res.send(err);
        }

        res.json(dll); // return all dll in JSON format
    });
});

// Add an email address
app.post('/api/dll', function (req, res) {

    console.log("Adding an email address...");

    Duluth.create({
        email: req.body.email,
        done: false
    }, function (err, Duluth) {
        if (err) {
            res.send(err);
        }

        // create and return all the dll
        Duluth.find(function (err, dll) {
            if (err)
                res.send(err);
            res.json(dll);
        });
    });

});

// Update a Duluth Item
app.put('/api/dll/:id', function (req, res) {
    const Duluth = {
        email: req.body.email,
        quantity: req.body.quantity
    };
    console.log("Updating item - ", req.params.id);
    Duluth.update({_id: req.params.id}, Duluth, function (err, raw) {
        if (err) {
            res.send(err);
        }
        res.send(raw);
    });
});


// Delete a Duluth Item
app.delete('/api/dll/:id', function (req, res) {
    Duluth.remove({
        _id: req.params.id
    }, function (err, Duluth) {
        if (err) {
            console.error("Error deleting Duluth ", err);
        }
        else {
            Duluth.find(function (err, dll) {
                if (err) {
                    res.send(err);
                }
                else {
                    res.json(dll);
                }
            });
        }
    });
});


// Start app and listen on port 8080  
app.listen(process.env.PORT || 8080);
console.log("Duluth server listening on port  - ", (process.env.PORT || 8080));