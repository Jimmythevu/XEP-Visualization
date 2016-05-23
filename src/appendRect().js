function appendRect(){
    nodeEnter.append("rect")
        .attr("width", rectW)
 		.attr("fill",function (d){
			return d._children ? collapsedColor : "white"
		}) 
		.style("fill-opacity", 0.3)
        .attr("height", rectH)
        .attr("stroke", "white")
        .attr("stroke-width", 1);
}