//tooltip on click				
var tooltip2 = d3.select("body").append("div")
	.attr("class", "tooltip2")
	.style("width", 24 + "%")
	.style({position:"absolute",
		visibility:"hidden"});
		
function click (d){
	if (d._children){
		updateColors2(d3.select(this), d3.select(this.parentNode))	
	} else updateColors(d3.select(this), d3.select(this.parentNode))	
	var content2 ="<table>";
	if (d.attributes){
	  content2 +=
		d3.entries(d.attributes).map(function(o){
		  return "<tr>" + "<td>" +o.key + ": "+ "</td>" + "<td>" + o.value + "</td>" + "</tr>"
	  } ).join(" ");
	}
	content2 += "</table>";
	if (d.textContent) {
	 content2 += "<dt>Text</dt><dd>"+
	   d.textContent+"</dd>";
	}
	tooltip2.html(content2);
	tooltip.style("visibility", "hidden")
	tooltip2.style("visibility", "visible")
		.style("left", 10 + "px")
		.style("top", 10 + "px");

}


function updateColors(x, parent) {
    parent.selectAll("rect")
		.attr("fill",function (d){
			return d._children ? collapsedColor : rectWhite
		})
    x.select("rect")
		.attr("fill", selectedColor)

}

function updateColors2(x, parent) {
    parent.selectAll("rect")
		.attr("fill",function (d){
			return d._children ? collapsedColor : rectWhite
		})
    x.select("rect")
		.attr("fill", selectedAndCollapsed)

}