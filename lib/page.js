// Tabris.js RSS Reader
// Feb 10, 2016
// @author: Carlos Ernesto López
// @contact: facebook.com/c.ernest.1990

exports.init = function( title, _top, type, bgTrans ){
	// So why we don't use ScrollView all the time?  
	// CollectionView doesn't work properly with ScrollView but works perfectly with composite thats why,
	// in a CollectionView (list) the vertical scrolling is included in the widget itself, 
	// nothing good happens when you make scrolling over scrolling :p  

	var type = type || 'Composite';

	var __page = tabris.create("Page", { title: title || config.appName, topLevel: _top || false, background: 'teal' });

	if( typeof bgTrans != 'undefined' ) {
		var bgTrans = tabris.create("ImageView", 
					  { left: 5, right: 5, top: 0, bottom: 5, image: 'images/bgrow.png', scaleMode: 'stretch' }).appendTo(__page);
	}
	
	var main = tabris.create(type, { left: 5, top: 0, right: 5, bottom: 5 }).appendTo(__page);
	var _com = tabris.create("Composite", {left: 0, width: 1, height: 1, top: 0} ).appendTo(__page);
	
	__page.open();

	return main;
}