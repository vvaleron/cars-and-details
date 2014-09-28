var mongo = require('mongodb');

var Server = mongo.Server,
    Db = mongo.Db,
    BSON = mongo.BSONPure;

var server = new Server('localhost', 27017, {auto_reconnect: true});
db = new Db('working-session', server, {safe: true});

db.open(function(err, db) {
    if(!err) {
        console.log("Connected to 'working-session' database");
        db.collection('users', {safe:true}, function(err, collection) {
            if (err) {
                console.log("The 'users' collection doesn't exist. Creating it with sample data...");
                populateDB();
            }
        });
    }
    console.log("close connection to 'working-session' database");
});

db.close();

exports.findById = function(params, res) {
    db.collection('users', function(err, collection) {
                   collection.findOne({ _id : new BSON.ObjectID(params.user._id) }, function(err, item) {
                       params.user = item;
                       res.end(JSON.stringify(params));
        });
    });
};

exports.findAll = function(req, res) {
    db.collection('users', function(err, collection) {
        collection.find().toArray(function(err, items) {
            res.send(JSON.stringify(items));
        });
    });
};

exports.addUser = function(req, res) {
    var user = req.body,
    saveRecord = function(){

       db.collection('users', function(err, collection) {
            collection.insert(user, {safe: true}, function (err, result) {
                 if (err) {
                     res.send('creating new user failed!!');
                 } else {
                     console.log('Success: ' + JSON.stringify(result[0]));
                     res.send(201);
                 }
            })
        });

    };

    db.collection('users', function(err, collection) {
        collection.find({'email':user.email}).toArray(function(err, items) {
            if (err) {
                res.send({'error':'An error has occurred during compare email filds'});
            }
            if (items.length == 0) {
                saveRecord();
            } else {
                res.send(204);
            }

        });
    });


};

exports.login = function (req, res) {
    var credentials = req.body;

    db.collection('users', function(err, collection) {
        collection.findOne({ email : credentials.email }, function(err, item) {
            if (!item) {
                res.send(204);
            }
            if (item.password == credentials.password) {
                delete item.password;
                delete item.password_verify;

                res.cookie('currentUser', JSON.stringify(item._id), { expires: new Date(Date.now() + 9000000) });
                res.status(200).send(item);
            }

        })
    });
};

exports.autoLogin = function (req, res) {
    var id = req.body.id;

    db.collection('users', function(err, collection) {
        collection.findOne({ _id : new BSON.ObjectID(id) }, function(err, item) {
            if (item) {
                delete item.password;
                delete item.password_verify;

                res.send(item);
            } else {
                res.send(204);
            }
        });
    });
};

exports.updateUser = function(req, res) {
    var id = req.params.id;
    var user = req.body;
    delete user._id;
    console.log('Updating user: ' + id);
    console.log(JSON.stringify(user));
    db.collection('users', function(err, collection) {
        collection.update({'_id':new BSON.ObjectID(id)}, user, {safe:true}, function(err, result) {
            if (err) {
                console.log('Error updating wine: ' + err);
                res.send({'error':'An error has occurred'});
            } else {
                console.log('' + result + ' document(s) updated');
                res.send(user);
            }
        });
    });
}

exports.deleteUser = function(req, res) {
    var id = req.params.id;
    console.log('Deleting user: ' + id);
    db.collection('users', function(err, collection) {
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

   var users = [{
       login        : "igorOliynik",
       password     : "1111",
       userType     : "manager",
       firstName    : "Ігор",
       secondName   : "Олійник",
       thirdName    : "Батькович",
       position     : "директор",
       mail         : "igor.oliynik@gmail.com",
       phones       : {
           first    : "097 888 88 88",
           second   : "093 888 88 88",
           third    : "045 63 8 88 88"
       },
       description  : "The aromas of fruit and spice give one a hint of the light drinkability of this lovely",
       picture: "igorOliynik.jpg"
   }];

    db.collection('users', function(err, collection) {
        collection.insert(users, {safe:true}, function(err, result) {});
    });

};