var User = require('../models/user')
var userSession = require('../models/userSession')

var UserController = {

 // Finds/retrieves a user from the database
  Find: function(req, res){
    User.findOne({_id: req.body.id}, async function(err, existingUser){
      console.log(existingUser)
      res.send(existingUser)
    })
  },

  Create: function(req, res){

    const { body } = req;

    const {
      firstName,
      lastName,
      email,
      password
    } = body;


    User.findOne({email: email}, async function(err, existingUser) {
      if (err) {
        res.send({
          success: false,
          message: "db server error!",
        })}
      else if (existingUser !== null ) {
        res.send(existingUser);
      }
      else{
        const newUser = new User();
        newUser.email = email;
        newUser.firstName = firstName;
        newUser.lastName = lastName;
        newUser.password = newUser.hashedPassword(password)

        newUser.save(function(err){
          if (err) {
            res.send({
              success: false,
              message: "db server error!",
            })}
          console.log(newUser)
          res.send(false)
        });
      }
    });
  },


  Index: function(req,res){
    User.find(function(err, users) {
      if (err) { throw err; }
        res.json(users)
      });
  },

  Authenticate: function(req, res){

    const { body } = req;

    const {
      email,
      password
    } = body;

    User.findOne({email: email}, async function(err, existingUser) {
      if (err) {
        res.send({
          success: false,
          message: "db server error!",
        })}
      else if (existingUser !== null ) {
          if (existingUser.validPassword(password)) {

            const userSessionNew =  new userSession();
            userSessionNew.userId = existingUser._id
            userSessionNew.save((err,doc)=> {
              if (err) {
                res.send({
                success: false,
                message: "db server error!",
              })}
              return res.send({
                success: true,
                message: 'Valid log in',
                token: doc._id,
                userId: existingUser._id
              })
            })
          }
          else {
            res.send({
              success: false,
              message:'Wrong Password'
              })
          }
      }
      else{
        res.send({
        success: false,
        message:'No user with that email'
        })
      }
    })
  },

  Logout: function(req,res){
    const { query } = req;
    const { token } = query;

    userSession.findOneAndUpdate(
    {
      _id: token,
      isOnline: true
    },

    {
      $set:{isOnline:false}
    },
    function(err, sessions){
      console.log(sessions)
      if(err) {
        res.send({
          success: false,
          message: 'db error'
        })
      }
      else {
        res.send({
          success: true,
          message: 'logged out'
        })
      }
    })

  }
};

module.exports = UserController;
