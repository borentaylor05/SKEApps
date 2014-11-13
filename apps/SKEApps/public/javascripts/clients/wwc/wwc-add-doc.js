
var wwc_go = {
	getSecondary: function(id){
		gadget_helper.get(environment.remote_server+"/apps/wwc/doc-dropdown.json?primary="+id.toString(), {}, dropdown.createSecondaryDropdown);
	},
	getSubtopic: function(id){
		gadget_helper.get(environment.remote_server+"/apps/wwc/doc-dropdown.json?secondary="+id.toString(), {}, dropdown.createSubtopicDropdown);
	}
}

var dropdown = {
	createSecondaryDropdown: function(data){
		console.log(data);
		$("#select-menu-2").removeClass("hide");
		$("#secondary-menu").empty();
		data = JSON.parse(data.text);
		for(var i = 0 ; i < data.length ; i++){
			var topic = '<li><a class="secondary" id="'+data[i].id+'" href="#">'+data[i].name+'</a></li>';
			$("#secondary-menu").append(topic);
		}
		setTimeout(gadgets.window.adjustHeight(), 2000);
		$(".secondary").each(function(){
			$(this).on("click touch", function(){
				$("span[data-bind='secondary-label']").text("Selected: "+$(this).text());
				var id = $(this).attr("id");
				wwc_go.getSubtopic(id);
			});
		});
	},
	createSubtopicDropdown: function(data){
		$("#select-menu-3").removeClass("hide");
		$("#subtopic-menu").empty();
		data = JSON.parse(data.text);
		for(var i = 0 ; i < data.length ; i++){
			var topic = '<li><a class="subtopic" id="'+data[i].id+'" href="#">'+data[i].name+'</a></li>';
			$("#subtopic-menu").append(topic);
		}
		setTimeout(gadgets.window.adjustHeight(), 2000);
		$(".subtopic").each(function(){
			$(this).on("click touch", function(){
				$("span[data-bind='subtopic-label']").text("Selected: "+$(this).text());
				var id = $(this).attr("id");
				new_doc.subtopic_id = id;
				$("#name, #link, #native-div, #original, .h-label, #submit, #summary").removeClass("hide");
				setTimeout(gadgets.window.adjustHeight(), 2000);
			});
		});
		setTimeout(gadgets.window.adjustHeight(), 5000);
	}
}