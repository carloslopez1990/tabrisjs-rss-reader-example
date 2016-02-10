// Tabris.js RSS Reader
// Feb 10, 2016
// @author: Carlos Ernesto López
// @contact: facebook.com/c.ernest.1990

exports.init = function() {
 // Ok we need a page to contain all the crazy things we are going to create
    var page = libs.page(config.appName, true);
   
  // Now we will create a tab per source
    var tabsDef = config.newsSources;

    // So we need a Tab Container

      // Every source have a different background 
      // thats why tabsDef[0].split('|')[1], because initially we set the background of the first source
 
    tabs = tabris.create('TabFolder', 
               { left: 0, top: 0, right: 0, background: tabsDef[0].split('|')[1], textColor: 'white' }).appendTo(page);

    counter = 0;

    // So now we add the tabs to the Tab Container
    _tabs = [];

    tabsDef.forEach(function( thisTab ){
      thisTab = thisTab.split('|');
      _tabs[ counter ] = tabris.create( 'Tab', { title: thisTab[0], background: thisTab[1] } ).appendTo(tabs);
      counter++;
    });

    // When the user change the tab we need to change the tab container background
    tabs.on("change:selection", function(widget, tab) {
      counter = 0;
      tabsDef.forEach(function( thisTab ){
        thisTab = thisTab.split('|');
        if( tab.get('title') == thisTab[0] ) {
          url = thisTab[2];
          tabs.set({background: thisTab[1], textColor: 'white'});
          // refresh( counter ); // optionally we could refresh everytime the users change their selections 
        }
        counter++;
      })
    });

  // Check the news.widget.js file for more information but basically we crete the list and assign the refresh function to the onRefresh event
 
    var list = [];
    _nWidget = require('./news.widget.js').wgnews;

    for( x=0;x<tabsDef.length;x++ ) {
      list[ x ] = _nWidget( x );
      list[ x ].appendTo(_tabs[ x ]); // Also we add the list to the tab
      list[ x ].on('refresh', function(widget){
         _refresh = true; 
         refresh( widget.get('id').replace('list_', '') );
      });
      list[ x ].set('itemHeight', 140);
    }


 // Show the loading indicator and get the news

    function refresh( counter ) {
       list[counter].set({
        refreshIndicator: true,
        refreshMessage: "loading..."
      });
      getItems( counter );
    }

    cache = []; // Stores cached information

  // This function get the info from the web service using the Fetch function

    function getItems( counter ) {
      loading = true;
      url = tabsDef[counter].split('|')[2];

      // If the url is not in cache or the user is refreshing we get the info from the RSS 
      if( (typeof cache[url] == 'undefined' || cache[url] == '') || _refresh == true )

        fetch( url ).then(function( res ){ 
            return res.json();
        }).then(function( res ){
          list[counter].set('items', res.items);
          cache[url] = res.items;
          loading = false;
          list[counter].set('refreshIndicator', false);
          list[counter].set('refreshMessage', '');
        });

      // If not we get the info from cache
      else {

        list[counter].set('items', cache[url] );
        loading = false;
        list[counter].set('refreshIndicator', false);
        list[counter].set('refreshMessage', '');
      
      }

      _refresh = false;
    }

    // We are close to run this thing but before of that

    _refresh = false; // why we need to know when the user is refreshing? because refreshing is an async process 
                      // and if the user refresh 100 times the app could even crash, 
                      // so one refresh at time ok?
    
    url = tabsDef[0].split('|')[1]; // We set the default url 

    // Initially we get the news for all the tabs

    for(x=0;x<tabsDef.length;x++)
      refresh(x);
}