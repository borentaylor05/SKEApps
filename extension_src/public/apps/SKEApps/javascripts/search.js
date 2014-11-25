
var search = {
	typeahead: function(searchDoc, jive_user_id){
		$.ajax({
			url: "/api/core/v3/contents/?filter=entityDescriptor(102,"+searchDoc.trim().substring(4)+")",
			dataType: 'json',
			async: false,
			success: function(data) {
				//checks to see if json given has a populated list property
				if(data.hasOwnProperty('list') && data.list.length > 0){
					var portalHTML = data.list[0].content.text;
					console.log(searchDoc);
					$("#waste").html(portalHTML);
					var table = document.getElementsByTagName('tbody');
					table = table[0];
					var c = 0;
					var searchData = [];
					$(table).children().each(function(){
						var temp = "";
						$(this).children().each(function(){
							temp += $(this).text()+"|~"; 
						});
						var t = temp.split("|~");
						var doc = t[0]+" [~] "+t[1]+"";
						searchData.push(doc);
					});
					$('#doc_name').typeahead({
						  hint: true,
						  highlight: true,
						  minLength: 1
						},
						{
						  name: 'products',
						  displayKey: 'value',
						  source: utility.substringMatcher(searchData)
						});
					}
					$("#input").submit(function(e){
						e.preventDefault();
						var name = $("#doc_name").val().trim();
						$("#myDoc").empty().removeClass("hide");
						var getDoc = name.split("[~]");
						utility.getSearchDocHTML("#myDoc", getDoc[1]);
						analyze.search.submit($(this), jive_user_id); // disable to turn off search analysis
						$("#doc_name").val("");
						return false;
					});
			},
			error: function(error) {
					return error;
				//	console.log(error);

			}
		});
	}
	
} // END SEARCH OBJECT

var utility = {
	// div = where to place retrieved HTML, docNum = reference doc for search
	getSearchDocHTML: function(div, docNum){
		docNum = docNum.trim().substring(4);
		console.log(docNum);
		$.ajax({
			url: "/api/core/v3/contents/?filter=entityDescriptor(102," + docNum + ")"
			,dataType: 'json'
			,async: false
			,success: function(data) {
				//checks to see if json given has a populated list property
				
				if(data.hasOwnProperty('list') && data.list.length > 0){
					var portalHTML = data.list[0].content.text;
					$(div).html(portalHTML);
					gadgets.window.adjustHeight();
				}
			}
			,error: function(error) {
					return error;

			}
		});
	},
	substringMatcher: function(strs){
		return function findMatches(q, cb) {
		    var matches, substrRegex;
		 
		    // an array that will be populated with substring matches
		    matches = [];
		 
		    // regex used to determine if a string contains the substring `q`
		    substrRegex = new RegExp(q, 'i');
		 
		    // iterate through the pool of strings and for any string that
		    // contains the substring `q`, add it to the `matches` array
		    $.each(strs, function(i, str) {
		      if (substrRegex.test(str)) {
		        // the typeahead jQuery plugin expects suggestions to a
		        // JavaScript object, refer to typeahead docs for more info
		        matches.push({ value: str });
		      }
		    });
		 
		    cb(matches);
		};
	},
} // END UTILITY OBJECT

