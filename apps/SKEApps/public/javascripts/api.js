var api = {
     get:{
          person: function(jive_user_id, callback){
               $.ajax({
                    url: "/api/core/v3/people/"+jive_user_id.toString(),
                    type: "get",
                    dataType: "json",
                    success: function(data){
                         callback(data);
                    },
                    error: function(err){
                         console.log(err);
                    }
               });
          }
     }
}