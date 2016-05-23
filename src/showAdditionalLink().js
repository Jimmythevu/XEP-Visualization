function showAdditionalLink(){
	
	var couplingParent1;
	nodes.forEach(function(d){
		if (d.tagName == "tableInsert"){
			var tmp = d.attributes.tableName;
			nodes.forEach(function(c){
				if (c.tagName == "tableAccess" && c.attributes.tableName == tmp && (c.children == undefined || c.children[0].tagName != "tableInsert")){
					couplingParent1 = c;
				}
			})
		}
	});

	var couplingChild1;
	nodes.forEach(function(d){
		if (d.tagName == "tableInsert" && d.attributes.tableName == couplingParent1.attributes.tableName ){ couplingChild1 = d}
	});

	multiParents = [{
		parent: couplingParent1,
		child: couplingChild1
	}];

	additionalLink = multiParents.forEach(function(multiPair){
		svg.append("path", "g")
		.attr("class", "additionalParentLink")
		.style("visibility", "visible")
		.style("stroke-dasharray", ("6,2"))
		.attr("d", function(){
			var oTarget = {
				x:multiPair.parent.x0,
				y:multiPair.parent.y0
			};
			var oSource = {
				x: multiPair.child.x0,
				y: multiPair.child.y0
			};
			return diagonal ({
				source: oSource,
				target: oTarget
			});
		});
	});	
	
}