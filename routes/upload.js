var fs = require("fs"),
    path = require('path'),
    sizeOf = require('image-size'),
    mongo = require('mongodb');

var Server = mongo.Server,
    Db = mongo.Db,
    BSON = mongo.BSONPure;

var server = new Server('localhost', 27017, {auto_reconnect: true}),
    db = new Db('working-session', server, {safe: true});

//db.open(function(err, db) {
//    if(!err) {
//        console.log("Connected to 'working-session' database");
//        db.collection('subCategories', {safe:true}, function(err, collection) {
//            if (err) {
//                console.log("The 'categories' collection doesn't exist. Creating it with sample data...");
//                populateDB();
//            }
//        });
//    }
//});

var addUrlToDB = function(id,format,imageSize){
    db.open(function(err, db){
        if(!err){
            console.log("Connected to 'working-session' database");
            db.collection('items',{safe:true},function(err,collection){
                collection.update({_id: new BSON.ObjectID(id)},
                    {$set:
                            {
                                imageUrl    : "resources/images/items/"+id+format,
                                imageWidth  : imageSize.width,
                                imageHeight : imageSize.height
                            }
                    },
                    function(err, updated) {
                                if( err || !updated ) console.log("User not updated");
                                else console.log("User updated");
                                db.close();
                            });
            });
        }
    });
};

var saveItemImage = function (req, res, dirname){
    var itemId = req.route.params['itemId'],
    imageType = req.files.photo.type,
    imageSize = {},
    format;

    switch(imageType){
        case "image/jpeg" : format = '.jpg'
    }

    var newPath = path.join(dirname, "app/resources/images/items/" + itemId + format);

    fs.readFile(req.files.photo.path, function(err, data){

        fs.writeFile(newPath, data, function (err) {
            if(err){ console.log(err) }
            else{
                   sizeOf(newPath, function (err, dimensions) {
                       imageSize.width = dimensions.width;
                       imageSize.height = dimensions.height
                   });

                addUrlToDB(itemId,format,imageSize);

                res.end(JSON.stringify({
                    success : true,
                    name    : itemId,
                    format  : format,
                    type    : imageType
                }))
            }
        });
    })

};

exports.file = function(req, res, dirname) {
    var fileType = req.route.params['fileType'];

    switch (fileType){
        case "itemImage": return saveItemImage(req,res,dirname);
    }
};