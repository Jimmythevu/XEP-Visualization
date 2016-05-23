function update(source) {
    // Compute the new tree layout.
    nodes = tree.nodes(root).reverse();
    links = tree.links(nodes);
		
    // Normalize for fixed-depth.
    nodes.forEach(function (d) {
        d.y = d.depth * 150;
    });

enterNodes();
appendRect();	
appendText();		
appendImages();

	// Transition nodes to their new position.
    nodeUpdate = node.transition()
        .duration(duration)
        .attr("transform", function (d) {
        return "translate(" + d.x + "," + d.y + ")";
    });			
		
    nodeUpdate.select("text")
        .style("fill-opacity", 1);
	
	nodeUpdate.select("image");
	
    nodeUpdate.select("rect")
		.attr("ry", 20)
		.attr("rx", 20)
        .attr("width", rectW)
        .attr("height", rectH)
        .attr("stroke", "white")
        .attr("stroke-width", 1)
 		.attr("fill", function (d){
			return d._children ? collapsedColor : "white"
		}) 
		.style("fill-opacity", 0.3);	

    // Transition exiting nodes to the parent's new position.
    var nodeExit = node.exit().transition()
        .duration(duration)
        .attr("transform", function (d) {
        return "translate(" + source.x + "," + source.y + ")";
    })
        .remove();
				
    nodeExit.select("text");	

	nodeExit.select("image");
	
    nodeExit.select("rect")
        .attr("width", rectW)
        .attr("height", rectH);
		
    // Update the links…
    var link = svg.selectAll("path.link")
        .data(links, function (d) {
        return d.target.id;
		})
		;
	
    // Enter any new links at the parent's previous position.
    link.enter().insert("path", "g")
        .attr("class", "link")
        .attr("x", rectW / 2)
        .attr("y", rectH / 2)
        .attr("d", function (d) {
		var o = {
            x: source.x0,
            y: source.y0
        };
        return diagonal({
            source: o,
            target: o
        });
    });

    // Transition links to their new position.
    link.transition()
        .duration(duration)
        .attr("d", diagonal);	
	

    // Transition exiting nodes to the parent's new position.
    link.exit().transition()
        .duration(duration)
        .attr("d", function (d) {
        var o = {
            x: source.x,
            y: source.y
        };
        return diagonal({
            source: o,
            target: o
        });
		})
        .remove();
		
    // Stash the old positions for transition.
    nodes.forEach(function (d) {
        d.x0 = d.x;
        d.y0 = d.y;
    });
	
	
	// Remove old additional Link
	svg.selectAll("path.additionalParentLink").remove();
	
}