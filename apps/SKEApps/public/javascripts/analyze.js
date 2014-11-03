var analyze = {
	tab: {
		click: function(tab, type, user){
			if(type === "MM"){
				name = $(tab).val();
			}
			else if(type === "Bootstrap")
				name = $(tab).children('a').text();
			var data = {
				name: name,
				tab_type: type,
				jive_user_id: user
			};
			gadget_helper.post("http://localhost:3000/tabs.json", data, function(resp){
				console.log(resp);
			});
		}
	},
	doc: {
		click: function(button, user, tabClick){
			var data = {
				title: $(button).val(),
				doc_num: $(button).attr("id"),
				tab_click: tabClick,
				jive_user_id: user
			}
			gadget_helper.post("http://localhost:3000/docs.json", data, function(resp){
				console.log(resp);
			});
		}
	},
	search: {
		submit: function(form, user){
			var sub = $("#doc_name").val();
			console.log("SUBJECT: "+sub);
			var data = {
				subject: $("#doc_name").val(),
				jive_user_id: user
			}
			gadget_helper.post("http://localhost:3000/searches.json", data, function(resp){
				console.log(resp);
			});
		}
	}
}

function isEmpty(obj) {
    for(var prop in obj) {
        if(obj.hasOwnProperty(prop))
            return false;
    }

    return true;
}