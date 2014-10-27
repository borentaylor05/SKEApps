Most of what's below is now pointless because filters are awesome.  
Lesson learned: Read docs before trying to hack the system.  

This App was created for a custom instance of Jive Software.  

Some of our clients operate on the same instance, but each have their own knowledge base, and  each want a custom look and feel for that knowledge base.  To enable Jive 7 to accomplish these tasks, I created this app to do the following:
	
	- Allow custom html, css, js files for each client
		- These files are included in the switch() in main.js
		- The listed files are dynamically loaded to the DOM
		- Loaded files are determined by the space_id, the lone param in main.render(space_id) 


Since the Jive SDK compliles assets to one file, you cannot dynamically add them in the traditional way.  E.g. you cannot load stylesheets by appending a link element to the head for each stylesheet.  Instead you have to formulate a string to reference each stylesheet and then load them as a single source:

Below are the base strings for dynamically loading .css, .js and .html files:
	- To see how these are implemented, see main.js

The base string for attaching .js files is: 

//localhost:8080/gadgets/concat?container=default&gadget=http://localhost:8090/osapp/SKEApps/app.xml&debug=1&nocache=1&type=js&1=http://localhost:8090/osapp/SKEApps/javascripts/jquery.min.js&2=http://localhost:8090/osapp/SKEApps/javascripts/main.js

** The example above has 2 .js files
** localhost needs to be replaced for production

The base string for .css is:

//localhost:8080/gadgets/concat?container=default&gadget=http://localhost:8090/osapp/SKEApps/app.xml&debug=1&nocache=1&type=css&1=http://localhost:8090/osapp/SKEApps/stylesheets/bootstrap.min.css&2=http://localhost:8090/osapp/SKEApps/stylesheets/main.css

** The example above has 2 .css files
** localhost needs to be replaced for production

These strings must be dynamically generated in order to get custom layouts for each client

For 1 CSS file
//localhost:8080/gadgets/proxy?container=default&gadget=http://localhost:8090/osapp/SKEApps/app.xml&debug=1&nocache=1&html_tag_context=link&url=http://localhost:8090/osapp/SKEApps/stylesheets/main.css

For 1 HTML File:

//localhost:8080/gadgets/proxy?container=default&gadget=http://localhost:8090/osapp/SKEApps/app.xml&debug=1&nocache=1&html_tag_context=div&url=http://localhost:8090/osapp/SKEApps/clients/"+htmlFile+"