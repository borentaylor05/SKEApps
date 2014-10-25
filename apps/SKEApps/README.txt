
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