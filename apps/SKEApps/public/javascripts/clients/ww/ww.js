
var tags = [ 'cancellation', 'account info', 'mobile app', 'member services' ];
typeahead.setup("#tags", tags);

var actions = {
	form_submit: function(form){
		$(form).submit(function(e){
			var data = {
				docNum: $("input[name='docNum']").val(),
				tags: $("input[name='tags']").val()
			};
			console.log(data);
			console.log("Clicked Submit");
			osapi.http.get({href:'http://ec2-54-191-211-6.us-west-2.compute.amazonaws.com/php/test-jive-post.php?doc='+data.docNum+'&tags='+data.tags}).execute(function(result) {
			  if (!result.error) {
			    console.log(JSON.parse(result.content));
			  }
			  else
			  	console.log(result.error);
			});
			e.preventDefault();
		});
	},
	canvas_view: function(){
		$("#viewCanvas").click(function(e){
			gadgets.views.requestNavigateTo('canvas.two', { data1:"canvas2-one", data2:"canvas2-two"});
			e.preventDefault();
		});
	}
}