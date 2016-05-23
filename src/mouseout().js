// hide tooltip when mouse outline
function mouseout (d){
	if (d3.select(this).select("rect").attr("fill") != selectedAndCollapsed){
		if (d3.select(this).select("rect").attr("fill") != selectedColor){
				d3.select(this).select("rect").attr("fill", currentColor);
		}		
	}

	tooltip.style("visibility", "hidden")
	tooltip2.style("visibility", "visible")
}