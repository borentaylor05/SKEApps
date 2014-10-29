// JSON object that will hold the site map

var siteMap = {};

// Unique tab headers from the document table

var headers = [];
var portalHTML = "";
var currentPortal = 0;
var currentDoc = {};
var entryCount = 1;
var currentHeader = "";
var partA = "";
var partB = "";
var elementCount;

var megamenu = {
	init: function(sourceDoc){
		// Document ID for source table which builds the JSON obect siteMap
		//var sourceDocURL = "DOC-368885";
		// removes junk and returns clean JSON object
		console.log("SOURCE: "+sourceDoc);
		$.ajaxSetup({
			dataFilter: function(data, type) {
				return type === 'json' ? jQuery.trim(data.replace(/^throw [^;]*;/, '')) : data;
			}
		});
		$.ajax({
			url: "/api/core/v3/contents/?filter=entityDescriptor(102," + (sourceDoc).substring(4) + ")"
			,dataType: 'json'
			,async: false
			,success: function(data) {
			//console.log(data);
			
				//checks to see if json given has a populated list property
				
				if(data.hasOwnProperty('list') && data.list.length > 0){
					
					$('#megamenu').html(data.list[0].content.text);
					var tableList = document.getElementsByTagName('tbody');
					
					if(tableList.length) {
						
						var megaTable = tableList[0];
						
					
						$(megaTable).children().each(function() {
							
								$(this).children().each(function(){
									
									
									var landingPages = [];

									// Header check: if this is a new header create JSON branch otherwise continue counters
									
									if (entryCount==1 || (entryCount - 1) % 3 === 0  ){
										
										if (checkHeaders(this.textContent)){
											currentHeader = this.textContent.toString();
											elementCount = 0;
											siteMap[this.textContent.toString()] = [];
										}
									}
									
									// Landing Page element
									
									if (entryCount==2 || (entryCount - 2) % 3 === 0  ){
										
										partA = this.textContent.toString();

									}
									
									// Site URL element: combines elements and appends them to JSON branch
									
									if (entryCount % 3 === 0  ){
										
										partB = this.textContent.toString();
										siteMap[currentHeader][elementCount] = {"title":partA,"url":partB};
										elementCount++;
									}
									
									entryCount++;
								});					
						});
						
					}else {
					//	console.log('Nothing');
					}			
				}
			}
			,error: function(error) {
				//	console.log(error);

			}
		});

		//  Build main tabs and Header from JSON -------------------------------------------------------------------------------------------------------------------------
			
		var headerHTML = "<div class='megaHead' id='headNav'>";
		var tabHTML = "";
		var tabContent = "";

		for(var i=0;i<headers.length;i++){
			
			headerHTML += "<input type='button' class='megaHeadButton' id= 'tabBtn" + (i) + "' value='" + headers[i] +"' onclick='clickBtn(this)' />";
			
			tabContent += "<div class='mega' id='tab" + i + "'><div class='portal' id='portal" + i + "'></div><ul>";
			
			$.each(siteMap[headers[i]], function(x) {
							
				tabContent += "<input type='button' class='LPButton' id= '" + siteMap[headers[i]][x].url + "' value='" + siteMap[headers[i]][x].title +"' onclick='landingPageBtn(this)' />";
			});
				
			tabContent += "</ul></div>";
				
			tabHTML = tabContent;
		}
		headerHTML +="</div>";

		$('#megamenu').html(headerHTML);
		$('#megamenu').append(tabHTML);
		$('#megamenu').parent().parent().append("<br style='clear: both;' />");

		//  Initialize Menu -------------------------------------------------------------------------------------------------------------------------

		for (var i=0;i<headers.length;i++){
			// Pre-load each portal with the corresponding document
			$('#portal'+i).html(getDocHTML(siteMap[headers[i]][0].url,i));
			// Resize generated portals (JIVE i-frame fix to resize base height from the original 1000px)
			gadgets.window.adjustHeight();
			// Highlight first page on each tab
			document.getElementById(siteMap[headers[i]][0].url).className = 'LPButtonSelected';
			//Builds an array of initial landing page selections.
			initDoc = siteMap[headers[i]][0].url;
			currentDoc[i] = initDoc;
			// Hide all but the first tab
			if (i > 0){
				$('#tab'+i).css("display","none");
			}
		}
		// Set initial selected tab
		document.getElementById('tabBtn0').className = 'megaHeadButtonSelected';
	},
	analyze: {
		enabled: null,
		doc_view: function(btn, load){
			var data = {
				docNum: btn.attr("id"),
				title: btn.val(),
				onLoad: load
			};
			var url = environment.apache_url+"/php/test-jive-post.php";
  			console.log(data);
		//	gadget_helper.post(url, data, response.post_call);
		},
		init_doc: function(){
			var data = {
				docNum: $(".LPButtonSelected").attr("id"),
			 	title: $(".LPButtonSelected").val(),
			 	onLoad: true
			};
  			var url = environment.apache_url+"/php/test-jive-post.php";
  			console.log(data);
		//	gadget_helper.post(url, data, response.post_call);
		}
	}
}


// Open links in new tab
function newTab(){
	$("a").attr("target", "_blank");
}

// Loops through table to find unique headers and appends them to the headers array
function checkHeaders(headerEntry){

	var headCheck = 0;
	
	if (headers.length == 0){
		headers.push(headerEntry);
		return true;
	}
	
	else{
	
		for (var i=0;i<headers.length;i++){
		
			if(headers[i] == headerEntry){
				headCheck++;
			}
		}
	
		if (headCheck == 0){
			headers.push(headerEntry);
			return true;
		}
		else
			return false;
	}
}

// makes API GET request for the html content in the designated document -------------------------------------------------------------------------------------------------------------------------
function getDocHTML(docNum,portNum){
	$.ajax({
		url: "/api/core/v3/contents/?filter=entityDescriptor(102," + docNum.substring(4) + ")"
		,dataType: 'json'
		,async: false
		,success: function(data) {
			//console.log(data);
			//checks to see if json given has a populated list property
			
			if(data.hasOwnProperty('list') && data.list.length > 0){
				portalHTML = data.list[0].content.text;
				
				//update current portal with doc
				document.getElementById('portal' + portNum).innerHTML = portalHTML;
				currentDoc[portNum] = docNum;
				$(".portal a").each(function(){
					var url = $(this).attr("href");
					if(url.charAt(0) !== "#"){
						$(this).attr("target", "_blank");
					}
				});
			}
		}
		,error: function(error) {
				return error;
		//		console.log(error);

		}
	});
}

// Resize Menu Elements function - jive i-frame fix to resize base height from the original 1000px;
function resizePortal(portNum){
	
	$('#portal'+portNum).height();
	$('#tab'+portNum).height($('#portal'+portNum).height()+5);
	
	//console.log(portNum);
	//console.log($('#tab'+portNum).height());
	//console.log($('#portal'+portNum).height());
}
	
//  Click Functions -------------------------------------------------------------------------------------------------------------------------
		
// Header tab clicks

function clickBtn(button){

	document.getElementById('tabBtn' + currentPortal).className = 'megaHeadButton';
	$('#tab'+currentPortal).css("display","none");
	currentPortal = button.id.substring(6);
	document.getElementById('tabBtn' + currentPortal).className = 'megaHeadButtonSelected';
	if(megamenu.analyze.enabled){
		var active = $("#tab"+currentPortal).children().next().children();
		megamenu.analyze.doc_view(active, true);
	}
	$('#tab'+currentPortal).css("display","block");
}

// Landing page/ Portal navigation clicks

function landingPageBtn(button){

	document.getElementById(currentDoc[currentPortal]).className = 'LPButton';	
	getDocHTML(button.id,currentPortal);
	document.getElementById(currentDoc[currentPortal]).className = 'LPButtonSelected';
	gadgets.window.adjustHeight();
	if(megamenu.analyze.enabled)
		megamenu.analyze.doc_view($(button), false);
}

	

