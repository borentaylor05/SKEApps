
var ww = {
	form_submit: function(form){
		$(form).submit(function(e){
		  	var postdata = {
		    	docNum : $("input[name=docNum]").val(),
		    	tags : $("input[name=tags]").val()
		  	};
  			var url = environment.cloud_dev.apache_url+"/test.php";
			gadget_helper.post("http://localhost:3000/click.json", postdata, response.post_call);
			e.preventDefault();
		});
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
			gadget_helper.post("http://localhost:3000/tabs.json", data, response.test_rails);
			e.preventDefault();
		});
	}
}


var response = {
	post_call: function(obj){
		
		console.log(obj);
	},
	test_rails: function(obj){
		console.log(obj);
	}
}
