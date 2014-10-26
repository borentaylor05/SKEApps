var clients = {
	weight_watchers: 2006,
	hyundai: 2007
}

var main = {
	render: function(space_id, callback){
		switch(space_id){
			case clients.weight_watchers:
				var stylesheets = ["bootstrap.min.css", 
									"ttbs3.css",
									"clients/ww/custom.css",
									"clients/ww/ww_mm.css",
									"main.css"];

				var javascripts = ["typeahead.bundle.min.js",
									"myTypeahead.js",
									"bootstrap.min.js",
									"gadget-helper.js",
									"megamenu.js",
									"clients/ww/ww.js"];

				var html = "weight-watchers.html";
			break;
			case clients.hyundai:
				var stylesheets = ["bootstrap.min.css", 
									"ttbs3.css",
									"main.css"];

				var javascripts = ["typeahead.bundle.min.js",
									"bootstrap.min.js",
									"myTypeahead.js"];

				var html = "hyundai.html";
			break;
		}
		this.insert_css(stylesheets);
		this.insert_html_js(html, javascripts, space_id);
		callback();
	},
	insert_css: function(stylesheets){
			var base = environment.current+"/gadgets/proxy?container=default&gadget=http:"+environment.node_cur+"/osapp/SKEApps/app.xml&debug=1&nocache=1&html_tag_context=link&url=http:"+environment.node_cur+"/osapp/SKEApps/stylesheets/"+stylesheets[0];
			if(stylesheets.length > 1){
				base = environment.current+"/gadgets/concat?container=default&gadget=http:"+environment.node_cur+"/osapp/SKEApps/app.xml&debug=1&nocache=1&type=css&"
				for(var i = 1 ; i < stylesheets.length + 1 ; i++){
					base += i.toString()+"=http:"+environment.node_cur+"/osapp/SKEApps/stylesheets/"+stylesheets[i-1]+"&";
				}
			}
			$('<link rel="stylesheet" type="text/css" href="'+base+'" >')
.appendTo("head");
		gadgets.window.adjustHeight();
	},
	insert_html_js: function(html, javascripts, space_id){
			$("body").load(environment.current+"/gadgets/proxy?container=default&gadget=http:"+environment.node_cur+"/osapp/SKEApps/app.xml&debug=1&nocache=1&html_tag_context=div&url=http:"+environment.node_cur+"/osapp/SKEApps/clients/"+html+"", function(res){
				// must be done in callback so DOM has been loaded
				insertJavascripts(javascripts, space_id); 
				gadgets.window.adjustHeight();
			});
	}
}

var functions = {
	ww: function(){
		// actions object in wwForm.js
		megamenu.init("DOC-1011");
		megamenu.analyze.enabled = true;
		megamenu.analyze.init_doc();
		actions.form_submit("#afterCall");
		actions.canvas_view();
		$("#mmTab").click(function(){
			$("#megamenu").empty();
			megamenu.init("DOC-1011");
		});
	}
}


// must be done in callback so DOM has been loaded
function insertJavascripts(javascripts, space_id){
	var src = environment.current+"/gadgets/proxy?container=default&gadget=http:"+environment.node_cur+"/osapp/SKEApps/app.xml&debug=1&nocache=1&html_tag_context=script&url=http:"+environment.node_cur+"/osapp/SKEApps/javascripts/"+javascripts[0];
	if(javascripts.length > 1)
		src = environment.current+"/gadgets/concat?container=default&gadget=http:"+environment.node_cur+"/osapp/SKEApps/app.xml&debug=1&nocache=1&type=js&";
	for(var i = 1 ; i < javascripts.length+1 ; i++){
		src += i.toString()+"=http:"+environment.node_cur+"/osapp/SKEApps/javascripts/"+javascripts[i-1]+"&";
	}
	var script = document.createElement( 'script' );
	script.src = src;
	$("body").append( script );
	switch(space_id){
		case clients.weight_watchers:
			functions.ww();
		break;
	}
}


