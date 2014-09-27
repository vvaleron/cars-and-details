var express = require('express'),
    path = require('path'),
    fs = require('fs'),
    httpServer = require('http-server'),
    users = require('./routes/users'),
    categories = require('./routes/categories'),
    subCategories = require('./routes/subCategories'),
    items = require('./routes/items'),
    upload = require('./routes/upload');

var app = express();

app.configure(function () {
    app.set('localhost', process.env.PORT || 1337);
    app.use(express.logger('dev'));  /* 'default', 'short', 'tiny', 'dev' */
    app.use(express.bodyParser());
    app.use(express.static(path.join(__dirname, 'ngApp')));
});

// app.get('/users', users.findAll);
// app.get('/users/:id', users.findById);
app.post('/users/new', users.addUser);
// app.put('/users/:id', users.updateUser);
// app.delete('/users/:id', users.deleteUser);

app.get('/categories', categories.get);
app.get('/categories/:id', categories.getById);
app.post('/categories', categories.add);
app.put('/categories/:id', categories.update);
app.delete('/categories/:id', categories.delete);

app.get('/sub_categories', subCategories.get);
//app.get('/sub_categories/:id', subCategories.getById);
app.post('/sub_categories', subCategories.add);
//app.put('/sub_categories/:id', subCategories.update);
//app.delete('/sub_categories/:id', subCategories.delete);

app.get('/items', items.getAll);
app.get('/items/:parent_id', items.getByCategoryId);
app.get('/items/:parent_id/:sub_parent_id', items.getBySubCatAndCat);
app.post('/items', items.add);



/// Post files
app.post('/upload/:fileType/:itemId', function(req,res){
     return upload.file(req,res,__dirname)
});

app.post('/login-user',function(req,res){
    var params = {
        success  : true,
        errors   : {
            clientCode      : "Client not found",
            portOfLoading   : "This field must not be null"
        },
        user :{
            _id      : req.body._id,
            login    : req.body.login,
            password : req.body.password
        }
    };
    users.findById(params, res);

});

app.listen(1337, function(){
    console.log('Express server listening on port 1337');
});
