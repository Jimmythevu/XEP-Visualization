// Show tooltip when mouse over		
var tooltip = d3.select("body").append("div")
		.attr("class", "tooltip")
		.attr("stroke", "black")
		.attr("stroke-width", 1)
		.style("width", 24 + "%")
		.style({position:"absolute",
			   visibility:"hidden"});		   
			   
function mouseover (d){
	currentColor = d3.select(this).select("rect").attr("fill");
	if (d3.select(this).select("rect").attr("fill") != selectedAndCollapsed){	
		if (d3.select(this).select("rect").attr("fill") != selectedColor){
			d3.select(this).select("rect").attr("fill", "grey");
		}
	}
	var content ="<table>";
	if (d.attributes){
	  content +=
		d3.entries(d.attributes).map(function(o){
		  return "<tr>" + "<td>" +o.key + ": "+ "</td>" + "<td>" + o.value + "</td>" + "</tr>"
	  } ).join(" ");
	}
	content += "</table>";
	if (d.textContent) {
	 content += "<dt>Text</dt><dd>"+
	   d.textContent+"</dd>";
	}
	tooltip.html(content);
	tooltip2.style("visibility", "hidden")
	tooltip.style("visibility", "visible")
			.style("left", window.pageXOffset + 10 + "px")
			.style("top", window.pageYOffset + 10 + "px");		
 }