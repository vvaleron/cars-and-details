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
exports.getById = function(req,res){
    var id = req.route.params['id'];
    console.log('Getting category by _id: '+id);
    db.collection('categories',function(err,collection){
        collection.findOne({ _id : new BSON.ObjectID(id) }, function(err,item){
            console.log('Success: ',item);
            res.end(JSON.stringify(item));
        });
    });
};
exports.get = function(req,res){
    db.collection('categories', function(err, collection) {
        collection.find().toArray(function(err, items) {
            console.log(items);
            res.send(JSON.stringify(items));
        });
    });
};
exports.add = function(req,res){
    console.log('Adding category: ' + JSON.stringify(req.body.name));
    db.collection('categories', function(err, collection) {
        collection.insert({name:req.body.name}, {safe:true}, function(err, result) {
            if (err) {
                res.send({'error':'An error has occurred'});
            } else {
                console.log('Success: ' + JSON.stringify(result[0]));
                res.end(JSON.stringify({success  : true}));
            }
        });
    });
};
exports.update = function(req,res){
    var id = req.params.id,
        category = req.body;
    console.log('Updating category: ' + id);
    db.collection('categories', function(err, collection) {
        collection.update({'_id':new BSON.ObjectID(id)},category, {safe:true}, function(err, result) {
            if (err) {
                console.log('Error updating wine: ' + err);
                res.send({'error':'An error has occurred'});
            } else {
                console.log('' + result + ' document(s) updated');
                console.log(category);
                res.end(JSON.stringify({success  : true}));
            }
        });
    });
};
exports.delete = function(req,res){
    var id = req.params.id,
        justOne = true;
    console.log('Deleting category: ' + id);
    db.collection('categories', function(err, collection) {
        collection.remove({'_id':new BSON.ObjectID(id)}, justOne, function(err, result) {
            if (err) {
                res.send({'error':'An error has occurred - ' + err});
            } else {
                console.log('' + result + ' document(s) deleted');
                res.end(JSON.stringify({success  : true}));
            }
        });
    });
};

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