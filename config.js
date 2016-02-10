// Tabris.js RSS Reader
// Feb 10, 2016
// @author: Carlos Ernesto López
// @contact: facebook.com/c.ernest.1990

var config = {

  appName: 'Tabris.js RSS Reader', // You probably will use the app name in many places so is a good practice to set it in the config file
  securitySalt: 'myxssrtabrix123', // You can add an extra security layer to LocalStorage by adding a security salt to the keys 
  backgroundColor: 'teal',
  modules: 'details,news', // The filenames in the mod/ folder without the .js
  defaultModule: 'news',
  libs: 'page', // Libraries included in the lib/ folder we need in the app

 // For this particular app i added a news Sources setting so you can easily play with sources and check how fast is creating an app with Tabris
  newsSources: ['Belelu|#FF4D4D|http://rss2json.com/api.json?rss_url=https%3A%2F%2Ffeeds.feedburner.com%2Fbelel',
                'Fayerwayer|#333|http://rss2json.com/api.json?rss_url=https%3A%2F%2Ffeeds.feedburner.com%2Ffayerwayer',
                'Bolido|#369|http://rss2json.com/api.json?rss_url=https%3A%2F%2Ffeeds.feedburner.com%2Fbolido']
}

exports.config = config;