var bcrypt    = require('mongoose-bcrypt'),
    jwt       = require('jsonwebtoken'),
    _         = require('lodash'),
    env       = require('../config/environment'),
    User      = require('../models/user.js'),
    Channel   = require('../models/channel.js')
    users     = User.find();

                require('dotenv').load();
var secretKey = process.env.SECRET_KEY;


/********************
* CREATE A NEW USER
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
      message: "Welcome to Channel Pasadena!",
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

    // ***** This is the method offered in the mongoose-bcrypt docs: ***
  // User.create({
  //   email:    req.body.email,
  //   handle:   req.body.handle,
  //   city:     req.body.city,
  //   state:    req.body.state,
  //   zip:      req.body.zip,
  //   password: req.body.password,
  //   isAdmin:  true
  // }, function(err, user) {
  //   if (!err) {
  //     // Verify password with callback
  //     user.verifyPassword(req.body.password, function(err, valid) {
  //      if (!err)
  //       console.log(valid ? "ValidAsync" : "InvalidAsync"); //=>'ValidAsync'
  //     });
  //     // Verify password synchronously
  //     var valid = user.verifyPasswordSync('bogusPassword');
  //     console.log(valid ? "ValidSync" : "InvalidSync"); //=>'InvalidSync'
  //   }
  // });
}

/********************
* LOGIN
*********************/

function loginUser(req, res, next) {
  var email = req.body.email;
  var password = req.body.password;
  // findUser(req.body.email)
  User.findOne({email: email
  }).select('email password handle').exec(function(err, user) {
      if (err) throw err;

      if (!user) {
        res.json({
          success: false,
          message: 'Authentication failed. User not found.'
        });
      } else { checkPassword(user, password, user.password) }
    var token = generateToken(email);
    res.json({
      success: true,
      message: 'A token has been generated.',
      token: token,
      user: user
    });
  });
}



function getUser(req, res) {
  var token = req.headers['x-auth'];
  var user = jwt.decode(token, secretKey);
  //TODO: pull user info from database
  res.json(user);
}




// helper functions

  function findUser(email) {
    return _.find(users, {email: email});
  }

  function checkPassword(user, password, validpassword) {
    user.verifyPassword(password, function(err, validpassword) {
      if (!validpassword) {
        res.json({
          success: false,
          messsage: 'You have failed at Authentication! Bad password! Bad!'
        });
      } else {
        generateToken(user.email)
      }
    });
  }

  function validateUser(email, password) {
    var user = findUser(email);
    return user.password == password;
  }

  function generateToken(email) {
    var token = jwt.sign(
      {email: email},
      secretKey,
      { expires: 2592000 } // expires in 30 days
    );
    return token;
  }

// export controller functions

module.exports = {
  getUser:    getUser,
  loginUser:  loginUser,
  createUser: createUser
}

