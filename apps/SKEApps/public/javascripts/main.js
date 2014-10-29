var clients = {
	weight_watchers: 2006,
	hyundai: 2007
}
var main = {
	ww: {
		run: function(){
			var tags = [ 'cancellation', 'account info', 'mobile app', 'member services' ];
			typeahead.setup("#tags", tags);
			// ww object in ww.js
			megamenu.init("DOC-1011");
			megamenu.analyze.enabled = true; // push MM analytic data to our DB
			megamenu.analyze.init_doc();
			ww.form_submit("#afterCall"); // param = form to submit
			search.typeahead("DOC-1017");
			ww.rails_get();
		}
	}
	ww_coaches: {
		run: function(){
			var tags = [ 'cancellation', 'account info', 'mobile app', 'member services' ];
			typeahead.setup("#tags", tags);
			// ww object in ww.js
			megamenu.init("DOC-1566");
			megamenu.analyze.enabled = true; // push MM analytic data to our DB
			megamenu.analyze.init_doc();
			ww.form_submit("#afterCall"); // param = form to submit
			search.typeahead("DOC-1567");
	}
}


