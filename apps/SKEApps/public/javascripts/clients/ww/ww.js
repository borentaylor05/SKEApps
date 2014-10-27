
var ww = {
	form_submit: function(form){
		$(form).submit(function(e){
		  	var postdata = {
		    	docNum : $("input[name=docNum]").val(),
		    	tags : $("input[name=tags]").val()
		  	};
  			var url = environment.cloud_dev.apache_url+"/test.php";
			gadget_helper.post(url, postdata, response.post_call);
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
	}
}


var response = {
	post_call: function(obj){
		res = $.parseJSON(obj.data);
		console.log(res.doc);
	}
}
