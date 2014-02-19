var express = require('express'),
    path = require('path'),
    httpServer = require('http-server'),
    users = require('./routes/users'),
    categories = require('./routes/categories');

var app = express();

app.configure(function () {
    app.set('localhost', process.env.PORT || 1337);
    app.use(express.logger('dev'));  /* 'default', 'short', 'tiny', 'dev' */
    app.use(express.bodyParser());
    app.use(express.static(path.join(__dirname, 'app')));
});

app.get('/users', users.findAll);
app.get('/users/:id', users.findById);
app.post('/users', users.addUser);
app.put('/users/:id', users.updateUser);
app.delete('/users/:id', users.deleteUser);

app.get('/categories', categories.get);
app.get('/categories/:id', categories.getById);
app.post('/categories', categories.add);
app.put('/categories/:id', categories.update);
app.delete('/categories/:id', categories.delete);

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
