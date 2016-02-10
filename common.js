// Tabris.js RSS Reader
// Feb 10, 2016
// @author: Carlos Ernesto López
// @contact: facebook.com/c.ernest.1990

exports.common = {
  // TextView is to tabris.js what div is to html, do you imagine a world where <div is <putacomplexwordhere_and_add_specialchars?? no right? 
  // Even in our languages, spanish in my case, probably english in yours, you can see how most users words trends to be shorter, this is a cool thing 
  // is the dead of burocracy
  label: function( str, _class ) { 
    _class = _class||null; 
    return tabris.create('TextView', { class: _class, markupEnabled: true, left: 10, top: 'prev() 10', right: 10, text: str }).appendTo( page ); 
  },
  
  // You will use a lot localstorage is like passing GET parameters to another module
  set: function( varName, value ) { 
    localStorage.setItem( config.securitySalt + varName, value); 
  },

  // So this is the way you get the info from the GET params
  get: function( varName ) { 
    return localStorage.getItem( config.securitySalt + varName ) || ''; 
  },

  // You will probably show a lot of notifications and another kind of messages, here is simply as c.toast('Hi');
  toast: function( msg ) { 
    window.plugins.toast.showShortBottom( msg ); 
  } 
}