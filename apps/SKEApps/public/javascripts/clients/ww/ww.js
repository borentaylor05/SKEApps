function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) != -1) 
        	return c.substring(name.length,c.length);
    }
    return "";
}



var ww = {
	begin_call: function(jive_user_id){
		$("#access").click(function(e){
			e.preventDefault();
			$(this).parent().addClass("hide");
			api.get.person(jive_user_id, function(user){
				var call_id = getCookie("call");

				data = {
					employee_id: user.jive.username,
					jive_user_id: jive_user_id,
					username: user.displayName,
					call_id: call_id
				};
				gadget_helper.post(environment.currentRails+"/calls.json", data, response.start_call)
			});

		});
	},
	end_call: function(form, jive_user_id){
		$(form).submit(function(e){
		  	var postdata = {
		    	docNum : $("input[name=docNum]").val(),
		    	tags : $("input[name=tags]").val(),
		    	jive_user_id: jive_user_id
		  	};
		  	document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
			gadget_helper.post(environment.currentRails+"/end-call", postdata, response.write);
			e.preventDefault();
		});
	},
	analyze: function(jive_user_id){
		$(".nav.nav-tabs > li").each(function(){
			$(this).click(function(){
				analyze.tab.click($(this), "Bootstrap", jive_user_id);				
			});
		});
		$(".megaHeadButton").each(function(){
			$(this).click(function(){
				analyze.tab.click($(this), "MM", jive_user_id);
			});
		});
		// button/doc analysis in megamenu.js
		// search analysis in search.js
	},
	process_post: function(data){
		console.log("Response: "+data);
	},
	canvas_view: function(){
		$("#viewCanvas").click(function(e){
			gadgets.views.requestNavigateTo('canvas.two', { data1:"canvas2-one", data2:"canvas2-two"});
			e.preventDefault();
		});
	},
	rails_get: function(data){
		$("#railsTest").click(function(e){
			var data = {
				name: "Test",
				tab_type: "Test",
				user_id: 1234567
			}
			gadget_helper.post(environment.currentRails+"/tabs.json", data, response.test_rails);
			e.preventDefault();
		});
	}
}


var response = {
	start_call: function(obj){
		var call = JSON.parse(obj.text);
		document.cookie = "call="+call.id+"; expires=Thu, 01 Jan 2015 00:00:00 UTC";
	},
	test_rails: function(obj){
		console.log(obj);
	}
}
