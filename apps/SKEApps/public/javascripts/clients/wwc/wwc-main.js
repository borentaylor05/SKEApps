
var wwc = {
	list_docs: function(data, callback){
		for(var i = 0 ; i < data.length ; i++){
			var items = "";
			for(var x = 0 ; x < data[i].docs.length ; x++){
				var native = data[i].docs[x].native;
				if(parseInt(native) === 0){
					var href = data[i].docs[x].link;
					var classes="link-header";
					var id = "";
					var target = "_blank";
					var rel = data[i].docs[x].original_doc;
				}
				else{
					var href = "#";
					var classes = "link-header sub-header";
					var id = this.get_doc_from_link(data[i].docs[x].link);
					var target = "_self";
					var rel = data[i].docs[x].link;
				}

				items += "<li><h3><a rel="+rel+" target="+target+" href='"+href+"' id='"+id+"' class='"+classes+"'>"+data[i].docs[x].name+"</a></h3><p class='summary'>"+data[i].docs[x].summary+"</p></li>";
			}
			var list = "<ul class='subtopics left'>"+items+"</ul>";
			$(".content-container").append("<h2 class='cat-header left'>"+data[i].name+"</h2>");
			$(".content-container").append(list);
		}
		callback();
	},
	get_all_docs: function(clicked_link){
		var docs = [];
		var i = 0;
		$("ul.subtopics").find(".sub-header").each(function(){
			var doc = {
				num: $(this).attr("id"),
				title: $(this).text(),
				header: $(this).parent().parent().parent().prev().text(),
				original: $(this).attr("rel"),
				index: i
			};
			if(clicked_link.attr("id") === doc.num)
				doc.current = true;
			else
				doc.current = false;
			i++;
			docs.push(doc);
		});
		return docs;
	},
	view_doc: function(link){
		var docs = this.get_all_docs(link);
		var curDoc = this.get_current_doc(docs);
		this.get_doc_html(link.attr("id"), curDoc, function(){
			buildNav(docs);
			gadgets.window.adjustHeight();
		});
	},
	get_doc_from_link: function(url){
		return url.substr(url.lastIndexOf('/') + 1);
	},
	get_current_doc: function(docs){
		for(var i = 0 ; i < docs.length ; i++){
			if(docs[i].current)
				return docs[i];
		}
	},
	get_doc_html: function(doc, curDoc, callback){
		$.ajax({
			url: "/api/core/v3/contents/?filter=entityDescriptor(102,"+doc.substring(4)+")",
			type: "get",
			async: false,
			dataType: "json",
			success: function(data){
				if(data.hasOwnProperty('list') && data.list.length > 0){
					$(".doc-container").html(data.list[0].content.text);
					$(".doc-container").prepend('<h1 class="header">'+curDoc.title+'<span class="original"><a target="_blank" href="'+curDoc.original+'">Click here to see original document.</a></span></h1>');
					$(".doc-container").append("</br>");
					if($(".overlay").hasClass("hide"))
						$(".overlay").removeClass("hide");
					gadgets.window.adjustHeight();
				}
				callback();
			},
			error: function(err){
				console.log(err.responseText);
			}
		});
	},
	close_doc: function(){
		$("#close").on("click touch",function(e){
			$(".overlay").addClass("hide");
			$(".navigation, .doc-container").empty();
			e.preventDefault();
		});
	},
	back: function(){
		$(".sub-subtopics").each(function(){
			$(this).addClass("hide");
		});
		$(".content").each(function(){
			$(this).addClass("hide");
		});
		$(".prime-container").removeClass("hide");
		$("#back").addClass("hide");
	}
}

function buildNav(docs){
	if(docs.length < 1)
		return;
	var curDoc = "";
	for(var i = 0 ; i < docs.length ; i++){
		if(docs[i].current)
			curDoc = docs[i];
	}
	if(curDoc.index === 0 && docs.length > 1){
		var right = "<a id='next' href='#' class='arrow'><i class='fa fa-arrow-circle-right fa-2x'></i><span class='r'>"+docs[curDoc.index + 1].title+"</span></a>";
		$(".navigation").append(right);
	}
	else if(curDoc.index === (docs.length - 1) && docs.length > 1){
		var left = "<a id='prev' href='#' class='arrow'><span class='l'>"+docs[curDoc.index - 1].title+"</span><i class='fa fa-arrow-circle-left fa-2x'></i></a>";
		$(".navigation").append(left);
	}
	else if(docs.length > 1){
		var right = "<a id='next' href='#' class='arrow'><i class='fa fa-arrow-circle-right fa-2x'></i><span class='r'>"+docs[curDoc.index + 1].title+"</span></a>";
		var left = "<a id='prev' href='#' class='arrow'><span class='l'>"+docs[curDoc.index - 1].title+"</span><i class='fa fa-arrow-circle-left fa-2x'></i></a>";
		var both = left + right;
		$(".navigation").append(both);
	}
	$(".navigation").append("<h3>"+curDoc.header+"</h3>");
	$("#prev").on("click touch", function(e){
		e.preventDefault();
		$(".navigation, .doc-container").empty();
		curDoc.current = false;
		docs[curDoc.index - 1].current = true;
		curDoc = docs[curDoc.index - 1]; // new current
		buildNav(docs);
		wwc.get_doc_html(curDoc.num, curDoc, function(){gadgets.window.adjustHeight()});
	});
	$("#next").on("click touch", function(e){
		e.preventDefault();
		$(".navigation, .doc-container").empty();
		curDoc.current = false;
		docs[curDoc.index + 1].current = true;
		curDoc = docs[curDoc.index + 1]; // new current
		buildNav(docs);
		wwc.get_doc_html(curDoc.num, curDoc, function(){gadgets.window.adjustHeight()});
	});
}