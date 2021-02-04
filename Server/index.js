const express = require('express');
const FormData = require('form-data');
const path = require('path');
const app = express();
const cors = require('cors');
const multer = require('multer');
const bodyparser = require('body-parser');
const mongodb = require('mongodb');
const mongo = require('mongodb').MongoClient;
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads');
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname);
    }
});
const ImageUplode = require('./stockmodel/ImageUplode');
const dbname = 'HubInfo';
const url = 'mongodb://localhost:27017';
app.use(bodyparser.json());

app.use(require('body-parser').urlencoded({ extended: true }));
app.use(cors());
var form = new FormData();
var db = null
const mongooption = { useNewUrlParser: true };
app.post('/admindata', (req, res) => {

    db.collection("HubAdmin").find({}).toArray((err, document) => {
        if (err)
            console.log("Error occured");
        else {
            document.forEach(element => {
                if (element.Username == req.body.Username && element.Password == req.body.Password) {
                    res.send({ Username: element.Username, UserID: element.UserID, LasttimeLogged: element.LasttimeLogged });
                } else {
                    res.send({ Username: "NOT FOUND", UserID: "NOT FOUND", LasttimeLogged: "NOT FOUND" });
                }
            });
        }
    });
});
app.get('/getdata', (req, res) => {
    db.collection("InventoryStocks").find().toArray((err, document) => {
        if (err)
            console.log("Error occured");
        else
            document.forEach(element => {
                ImageUplode.getimage(Number(element._id));
            });
        res.json(document);
    });

});
app.get('/ProductImage/:id', (req, res) => {

    db.collection("InventoryStocks").find().toArray((err, document) => {
        if (err)
            console.log("Error occured");
        else
            document.forEach(element => {
                if (req.params.id == element._id)
                    ImageUplode.getimage(Number(element._id));

            });
        var url = path.join(__dirname, 'uploads', req.params.id + '.jpg');
        res.sendFile(url);
    });
});
app.post('/updatedata', (req, res) => {
    var insertdata = req.body;
    insertdata.forEach(element => {
        db.collection("InventoryStocks").updateOne({ _id: element.id }, { $set: { inventoryQuantity: element.finalQuantity } }, function(err, res) {
            if (err) throw err;

        });
    });
});
const uploads = multer({ storage: storage });
app.post('/newstock', uploads.single('img'), (req, res) => {
    const file = req.file;
    console.log(file.originalname);
    var insertdata = JSON.parse(req.body.data);
    console.log(insertdata)
    insertdata.forEach(element => {
        db.collection("InventoryStocks").find({ _id: { $eq: element._id } }).toArray((err, document) => {
            if (err)
                console.log("Error occured");
            else {
                if (!document.length)
                    db.collection("InventoryStocks").insertOne(element, (err, result) => {
                        if (err)
                            console.log(err);
                        else {
                            console.log("Called me");
                            ImageUplode.uploadimage(Number(element._id), file.originalname);

                        }
                    });
                else
                    console.log("Data Already exists..");
            }
        });
    });

});

mongo.connect(url, mongooption, (err, clients) => {
    if (err)
        console.log('unable');
    else {
        console.log("Connected");
        db = clients.db(dbname);
    }
});
app.listen(3000, () => {
    console.log("I'm listening");
});
app.get('/getBranch', (req, res) => {

    db.collection("BranchDetails").find().toArray((err, document) => {
        if (err)
            console.log("Error occured");
        else
            res.json(document);
    });

});