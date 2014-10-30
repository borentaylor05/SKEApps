var api = {
	create: {
		person: function(data, welcome){
			$.ajax({
               url: "/api/core/v3/people?welcome="+welcome.toString(),
               type: "post",
               dataType: "json",
               contentType: "application/json",
               data: JSON.stringify(data),
               success: function(data){
               		console.log(data);
               },
               error: function(err){

               }
            });
		}
	}
}