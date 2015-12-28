var bcrypt    = require('mongoose-bcrypt'),
    jwt       = require('jsonwebtoken'),
    _         = require('lodash'),
    env       = require('../config/environment'),
    User      = require('../models/user'),
    Channel   = require('../models/channel');

                require('dotenv').load();
var secretKey = process.env.SECRET_KEY;


/*************************************
*    Get list of myChannels, in detail
**************************************/
function channelsMine(req, res) {
  Channel.find({}, function(err, channels) {
    if (err) res.send(err);
    res.json(req.user.myChannels);
  });
}

/********************
* Get All Users
*********************/
function getUsers(req, res) {
  User.find({}, function(err, users) {
    if (err) res.send(err);
    res.json(users); // return the users
  });
}

/********************
* Get a User
*********************/

function getUser(req, res) {
  /* the /api/users/:id route includes an id parameter
  for the /api/me route, set current user's id as the parameter */
    if (!req.params.id) { req.params.id = req.user._id; }
      console.log("req.params.id: ", req.params.id);
  User.findById(req.params.id, function (err, user) {
    if (err) res.send(err);

    // AUTHORIZE!
    if ((user.email === req.user.email) || req.user.isAdmin) {
      res.json(user);
    } else {
      res.status(403)
         .json({message: "You are not authorized to access this data."})
    }
  });
}

/********************
* Create a New User
*********************/
function createUser(req, res) {
  var user = new User();
  user.email    = req.body.email;
  user.handle   = req.body.handle;
  user.city     = req.body.city;
  user.state    = req.body.state;
  user.zip      = req.body.zip;
  user.password = req.body.password;

  // FIXME...
  if (user.email == "andrew@wingedearth.com") user.isAdmin = true;

  user.save(function(err) {
    if (err) {
      // duplicate entry
      if (err.code == 11000)
        return res.json({ success: false, message: 'A user with that email address already exists! '});
      else
        return res.json(err);
    }

    // return a message
    res.json({
      message: "Welcome to Film Avatar!",
      user: {
        _id:    user._id,
        email:  user.email,
        handle: user.handle,
        city:   user.city,
        state:  user.state,
        zip:    user.zip
      }
    });
  });
}

/**********************
*    Update User
**********************/

function updateUser(req, res) {
  User.findById(req.params.id, function(err, user) {

    if (err) res.send(err);

    // set the new user information if it exists in the request
    if (req.body.email)          user.email        = req.body.email;
    if (req.body.handle)         user.handle       = req.body.handle;
    if (req.body.password)       user.password     = req.body.password;
    if (req.body.city)           user.city         = req.body.city;
    if (req.body.state)          user.state        = req.body.state;
    if (req.body.zip)            user.zip          = req.body.zip;

    // save the user
    user.save(function(err) {
      if (err) res.send(err);
      // return a message
      res.json({ message: 'User updated!' });
    });
  });
}

/**********************
*    Add myChannel
**********************/

function addMyChannel(req, res) {
  User.findById(req.user._id, function(err, user) {
    if (req.body.myChannel) user.myChannels.push(myChannel);
    user.save(function(err) {
      if (err) res.send(err);

      var message = 'Subscribed to Channel ' + req.body.myChannel.channelName + '!';
      res.json({
        message: message,
        isCurator: req.body.myChannel.isCurator,
        isCreator: req.body.myChannel.isCreator
      });
    })
  });

}


/*************************************
*    Delete a user
**************************************/
function deleteUser(req, res) {
  User.remove({
        _id: req.params.id
      }, function(err, user) {
        if (err) res.send(err);

        res.json({ message: 'Successfully deleted' });
  });
}


/********************
* Login
*********************/

function loginUser(req, res, next) {
  User.findOne({email: req.body.email
  }).select('email password handle').exec(function(err, user) {
      if (err) throw err;
      if (!user) {
        res.json({
          success: false,
          message: 'Authentication failed. User not found.'
        });
      } else { checkPassword(user, req.body.password, user.password) }
    var token = generateToken(req.body.email);
    res.json({
      message: 'Token is generated.', success: true, token: token,
      email: user.email,
      handle: user.handle,
      _id: user._id
    });
  });
}

/****************************
*    Verify that token!
*****************************/
var tokenVerify = function(req, res, next) {
  console.log('Somebody just accessed the Film Avatar API!');
  var token = req.headers['authorization'];

  if (token) { // check header for token, and decode token
    token = token.split(" ")[1];

    // verifies secret and checks exp
    jwt.verify(token, secretKey, function(err, decoded) {

      if (err) {
        res.status(403).json({
          success: false,
          message: 'Failed to authenticate token.'
        });
      } else {
        req.decoded = decoded; // save to req for use in other routes
        next();
      }
    });

  } else {
    // if no token, return 403 (access forbidden) and error message
    res.status(403).send({
      success: false,
      message: 'No token provided.'
    });
  }
};

/*************************************
* Add Authenticated User into Request
**************************************/

var loadAuthUser = function(req, res, next) {
  User.findOne({email: req.decoded.email}, function(err, user) {
    req.user = user;
    next();
  });
}


// helper functions

  function checkPassword(user, password, validpassword) {
    user.verifyPassword(password, function(err, validpassword) {
      if (!validpassword) {
        res.json({
          success: false,
          messsage: 'You have failed at Authentication! Bad password! Bad!'
        });
      } else {
        generateToken(user.email);
      }
    });
  }

  function generateToken(email) {
    return jwt.sign(
      {email: email}, secretKey, {expires: 2592000} // expires in 30 days
    );
  }

// export controller functions

module.exports = {
  getUser:        getUser,
  loginUser:      loginUser,
  createUser:     createUser,
  getUsers:       getUsers,
  tokenVerify:    tokenVerify,
  loadAuthUser:   loadAuthUser,
  updateUser:     updateUser,
  deleteUser:     deleteUser,
  addMyChannel:   addMyChannel,
  channelsMine:   channelsMine
}

