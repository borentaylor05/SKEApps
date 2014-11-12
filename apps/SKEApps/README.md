Most of what's below is now pointless because filters are awesome.  
Lesson learned: Read docs before trying to hack the system.  

This App was created for a custom instance of Jive Software.  

NOTE: Renaming views really screws stuff up, so try to get the name right the first time.

Just FYI (really FMI):

Both of the following can get a Doc via osapi:

		osapi.jive.corev3.contents.get({
		     entityDescriptor: "102,1014"
		 }).execute(function(data){
		 	console.log(data);
		 });

		 osapi.jive.core.get({
		    "href": "/contents/?filter=entityDescriptor(102,1014)",
		    "v": "v3"
		}).execute(function(response){
			console.log(response);     
		});