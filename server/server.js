var loopback = require('loopback');
var boot = require('loopback-boot');
var fs = require('fs');

function isUserClass(modelClass) {
  return modelClass === loopback.User ||
    modelClass.prototype instanceof loopback.User;
}
function matches(id1, id2) {
  if (id1 === undefined || id1 === null || id1 ===''
    || id2 === undefined || id2 === null || id2 === '') {
    return false;
  }
  // The id can be a MongoDB ObjectID
  return id1 === id2 || id1.toString() === id2.toString();
}

loopback.Role.isRelated = function (modelClass, modelId, userId, callback) {
  // No userId is present
  if(!userId) {
    process.nextTick(function() {
      callback(null, false);
    });
    return;
  }

  // Is the modelClass User or a subclass of User?
  if(isUserClass(modelClass)) {
    process.nextTick(function() {
      callback(null, matches(modelId, userId));
    });
    return;
  }

  modelClass.findById(modelId, function(err, inst) {
    if(err || !inst) {
      callback && callback(err, false);
      return;
    }

    for(var r in modelClass.relations) {
      var rel = modelClass.relations[r];
      if(isUserClass(rel.modelTo)) {
        inst[r](function(err, user) {
          if(!err && user) {
            if (user instanceof Array) {           
              for (var i in user) {
                if (matches(user[i].id, userId)) {
                  callback && callback(null, true);
                  return;
                }
              }              
              callback && callback(null, false);
            } else {
              callback && callback(null, matches(user.id, userId));
            }
          } else {
            callback && callback(err, false);
          }
        });
        return;
      }
    }
    callback && callback(null, false);   
  });
};

loopback.Role.registerResolver(loopback.Role.RELATED, function(role, context, callback) {
  var userId = context.getUserId();
  if(!context || !context.model || !context.modelId) {
    process.nextTick(function() {
      callback && callback(null, false);
    });
    return;
  }
  var modelClass = context.model;
  var modelId = context.modelId;
  loopback.Role.isRelated(modelClass, modelId, userId, callback);
});

var app = module.exports = loopback();

app.use(loopback.bodyParser.json({limit: 1048576000}));
app.use(loopback.bodyParser.urlencoded({limit: 1048576000, extended: true}));

// request pre-processing middleware
app.use(loopback.compress());

// -- Add your pre-processing middleware here --

// boot scripts mount components like REST API
boot(app, __dirname);

// -- Mount static files here--
// All static middleware should be registered at the end, as all requests
// passing the static middleware are hitting the file system
// Example:
   var path = require('path');
   app.use(loopback.static(path.resolve(__dirname, "../client")));
   //app.use(loopback.static(path.resolve(__dirname, "../client")));
   
   // app.post('/imageupload', function(req, res) {
   // console.log(req);
    // var image =  req.files.image;
    // var newImageLocation = path.join(__dirname, 'client/images', image.name);
    
    // fs.readFile(image.path, function(err, data) {
        // fs.writeFile(newImageLocation, data, function(err) {
            // res.json(200, { 
                // src: 'images/' + image.name,
                // size: image.size
            // });
        // });
    // });
//});

// Requests that get this far won't be handled
// by any middleware. Convert them into a 404 error
// that will be handled later down the chain.
app.use(loopback.urlNotFound());

// The ultimate error handler.
app.use(loopback.errorHandler());

//app.start = function() {
  //start the web server
  // return app.listen(function() {
    // app.emit('started');
    // console.log('Web server listening at: %s', app.get('url'));
  // });
// };

 app.start = function() {
  //start the web server
  return app.listen(function() {
    app.emit('started');
    console.log('Web server listening at: %s', app.get('url'));
  });
};

// start the server if `$ node server.js`
if (require.main === module) {
	app.start();
}
