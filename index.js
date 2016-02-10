// Tabris.js RSS Reader
// Feb 10, 2016
// @author: Carlos Ernesto López
// @contact: facebook.com/c.ernest.1990

config = require('./config.js').config;

// Including Libs
  libs = [];
  config.libs.split(',').forEach(function(lib){
    libs[ lib ] = require('./lib/' + lib + '.js').init;
  });

// Pages
  pageCounter = 0;

// Web Services
  loading = false;
  Promise = require("promise");
  require("whatwg-fetch");
  
// Modules
  mods = [];

  config.modules.split(',').forEach(function( mod ){
    mods[ mod ] = require('./mod/' + mod + '.js' ).init;
  });

// Add reload icon
  tabris.create("Action", {
    title: "Reload",
    image: {src: "images/refresh.png", scale: 3}
  }).on("select", function() {
    tabris.app.reload();
  }); 

// Include common function  
  c = require('./common.js').common;

// Set background color
  tabris.ui.set("background", config.backgroundColor);

// Run
  mods[ config.defaultModule ]();