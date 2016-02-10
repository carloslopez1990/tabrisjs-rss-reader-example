// Tabris.js RSS Reader
// Feb 10, 2016
// @author: Carlos Ernesto López
// @contact: facebook.com/c.ernest.1990

exports.wgnews = function( counter ) {
	return tabris.create("CollectionView", {
      id: 'list_' + counter,
      layoutData: {left: 0, top: 0, right: 0, bottom: 0},
      items: [],
      refreshEnabled: true,
      initializeCell: function(cell){
          var icon, title, titleShadow, date, bg;

          bg = tabris.create('Composite', { left: 0, right: 0, top: 0, bottom: 0 }).appendTo(cell);

          // the news picture is setted up 100% x 100%

          icon = tabris.create('ImageView', 
                 { left: 0, right: 0, top: 2, bottom: 6, scaleMode: 'fill' }).appendTo(bg);
          
          date = tabris.create('TextView', 
                  { right: 5, bottom: 10, font: '11px', textColor: '#666', width: 200, alignment: 'center' }).appendTo(bg);
  
          // Tabris doesn't include a function to add shadow to text, but we can use this simple trick
          // create 2 textviews with exactly the same text and positioning almost at the same location, with just a few pixels of difference

		  		titleShadow = tabris.create('TextView', 
		                    { maxLines: 2, font: '25px', left: 6.5, right: 5, bottom: [date, -3], textColor: '#000' }).appendTo(bg);

		  		title = tabris.create('TextView', 
                   { maxLines: 2, font: '25px', left: 5, right: 5, bottom: [date, -2], textColor: '#fff' }).appendTo(bg);

          cell.on("change:item", function(widget, item) {
            
            title.set('text', item.title);
            titleShadow.set('text', item.title);
              
            try {
                icon.set('image', item.enclosure.link.replace('https://', 'http://').replace('.jpg', '-320x210.jpg'));
            }
            catch( error ) {
                icon.set('image', './images/notfound.png');
            }
              
            date.set('text', item.pubDate);
          });
      }
    }).on("select", function(target, value) {

      c.set( 'title', value.title );
      
      // so we delete images tags and some copyrights tags

      c.set( 'content', value.content.replace(/<img[^>]+(>|$)/g, "").replace(/\u00a9 (.*?)<\/div>/g, '').replace(/\(cc\) (.*?)<\/div>/g, '') );
      c.set( 'pubDate', value.pubDate );
      
      try {
        // in this particular case we modify the images url in order to make them load faster 
        c.set( 'icon', value.enclosure.link.replace('https://', 'http://').replace('.jpg', '-320x210.jpg') );
      }
      catch( error ) {
        c.set( 'icon', 'none' );
      }
      
      mods.details();
    });
}