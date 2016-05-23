function enterNodes(){
	// Update the nodes…
    node = svg.selectAll("g.node")
        .data(nodes, function (d) {
        return d.id || (d.id = ++i);
    });
	

    // Enter any new nodes at the parent's previous position.
    nodeEnter = node.enter().append("g")
        .attr("class", "node")
        .attr("transform", function (d) {
        return "translate(" + d.x + "," + d.y + ")";
    })
    .on("click", click)
	.on("mouseover", mouseover)
	.on("dblclick", dblclick)
	.on("mouseout", mouseout);
}
