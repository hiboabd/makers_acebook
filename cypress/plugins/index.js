// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

var mongoose = require('mongoose');

module.exports = (on) => {
  // `on` is used to hook into various events Cypress emits
  // `config` is the resolved Cypress config
  on('task', {
    emptyUsers() {
      return new Promise(function(resolve) {
        mongoose.connect('mongodb://localhost:3030/acebook_test', function(err) {
          console.log(mongoose.connection)
          console.log(mongoose.connection.collections)
          mongoose.connection.collections.users.drop(function() {
            resolve('done');
          });
        });
      });
    },
    emptyPosts() {
      return new Promise(function(resolve) {
        mongoose.connect('mongodb://localhost:3030/acebook_test', function(err) {
          mongoose.connection.collections.posts.drop(function() {
            resolve('done');
          });
        });
      });
    },
    consoleLog(message) {
      console.log("this is a console Log");
      console.log(message);
      return null
    }
  });
}
