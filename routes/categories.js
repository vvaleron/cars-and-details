var mongo = require('mongodb'),
    subCategories = require('./subCategories');

var Server = mongo.Server,
    Db = mongo.Db,
    BSON = mongo.BSONPure;

var server = new Server('localhost', 27017, {auto_reconnect: true});
db = new Db('working-session', server, {safe: true});

db.open(function(err, db) {
    if(!err) {
        console.log("Connected to 'working-session' database");
        db.collection('categories', {safe:true}, function(err, collection) {
            if (err) {
                console.log("The 'categories' collection doesn't exist. Creating it with sample data...");
                populateDB();
            }
        });
    }
});

exports.findById = function(params, res) {
    db.collection('categories', function(err, collection) {
        collection.findOne({ _id : new BSON.ObjectID(params.user._id) }, function(err, item) {
            params.user = item;
            res.end(JSON.stringify(params));
        });
    });
};

exports.findAll = function(req, res) {
    db.collection('categories', function(err, collection) {
        collection.find().toArray(function(err, items) {
            console.log(items);
            res.send(JSON.stringify(items));
        });
    });
};

exports.addCategory = function(req, res) {
    var category = req.body;
    console.log('Adding category: ' + JSON.stringify(category));
    db.collection('categories', function(err, collection) {
        collection.insert(category, {safe:true}, function(err, result) {
            if (err) {
                res.send({'error':'An error has occurred'});
            } else {
                console.log('Success: ' + JSON.stringify(result[0]));
                res.send(result[0]);
            }
        });
    });
}

exports.updateCategory = function(req, res) {
    var id = req.params.id;
    var category = req.body;
    delete category._id;
    console.log('Updating category: ' + id);
    console.log(JSON.stringify(category));
    db.collection('categories', function(err, collection) {
        collection.update({'_id':new BSON.ObjectID(id)}, category, {safe:true}, function(err, result) {
            if (err) {
                console.log('Error updating wine: ' + err);
                res.send({'error':'An error has occurred'});
            } else {
                console.log('' + result + ' document(s) updated');
                res.send(category);
            }
        });
    });
}

exports.deleteCategory = function(req, res) {
    var id = req.params.id;
    console.log('Deleting category: ' + id);
    db.collection('category', function(err, collection) {
        collection.remove({'_id':new BSON.ObjectID(id)}, {safe:true}, function(err, result) {
            if (err) {
                res.send({'error':'An error has occurred - ' + err});
            } else {
                console.log('' + result + ' document(s) deleted');
                res.send(req.body);
            }
        });
    });
}

/*--------------------------------------------------------------------------------------------------------------------*/
// Populate database with sample data -- Only used once: the first time the application is started.
// You'd typically not find this code in a real-life app, since the database would already exist.
var populateDB = function() {

    var category = [{
        name        : "Трансмісія",
        picture     : "transmission.jpg"
    }];

    db.collection('categories', function(err, collection) {
        collection.insert(category, {safe:true}, function(err, result) {});
    });

};