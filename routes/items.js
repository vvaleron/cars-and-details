var mongo = require('mongodb');

var Server = mongo.Server,
    Db = mongo.Db,
    BSON = mongo.BSONPure;

var server = new Server('localhost', 27017, {auto_reconnect: true});
DB = new Db('working-session', server, {safe: true});

DB.open(function(err, db) {
    if(!err) {
        console.log("Connected to 'working-session' database");
        db.collection('subCategories', {safe:true}, function(err, collection) {
            if (err) {
                console.log("The 'categories' collection doesn't exist. Creating it with sample data...");
                populateDB();
            }
        });
    }
    DB.close();
    console.log("close connection to 'working-session' database");
});

//exports.getAll = function(req,res){
//    db.collection('items',function(err,collection){
//        collection.find().toArray(function(err,items){
//            res.send(JSON.stringify(items));
//        });
//    });
//};

exports.getByCategoryId = function(req,res){
    var id = req.params["parent_id"];
//    console.log('Getting all child by CategoryID: '+id);
    db.collection('items',function(err,collection){
        collection.find({ categoryId : id }).toArray(function(err, items) {
//                console.log('Success: ',items);
                res.send(JSON.stringify(items));
            });
    });
};

exports.getBySubCatAndCat = function(req,res){
    var catId = req.params["parent_id"],
        subId = req.params["sub_parent_id"];
    console.log(catId,"PARENT");
    console.log(subId,"SUB PARENT");

    db.collection('items',function(err,collection){
        collection.find({
            categoryId      : catId,
            subCategoryId   : subId
        }).toArray(function(err, items) {
                console.log('Success: ',items);
            res.send(JSON.stringify(items));
        });
    });
};

exports.get = function(req,res){
    db.collection('items', function(err, collection) {
        collection.find().toArray(function(err, items) {
            //console.log(items);
            res.send(JSON.stringify(items));
        });
    });
};

exports.add = function(req,res){
    console.log('Adding new Item: ' + JSON.stringify(req.body.name));
    db.collection('items', function(err, collection) {
        collection.insert({
            name            : req.body.name,
            categoryId      : req.body.categoryId,
            subCategoryId   : req.body.subCategoryId
            },
            {safe:true},

            function(err, result) {
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
    db.collection('subCategories', function(err, collection) {
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
    db.collection('subCategories', function(err, collection) {
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

var populateDB = function() {
//  data schema

//    var items = [{
//        _id         : "ObjectId("535ab00942c2d98413000001")",
//        name        : "Руль"
//        imageUrl    : "resources/images/items/535ab00942c2d98413000001.jpg.jpg",
//        imageWidth  : 100,
//        imageHeught : 200,
//        subCategoryId : "535ab00942c2d98413000002",
//        categoryId : "535ab00942c2d98413000003"
//    }];
//
//    db.collection('items', function(err, collection) {
//        collection.insert(items, {safe:true}, function(err, result) {});
//    });

};