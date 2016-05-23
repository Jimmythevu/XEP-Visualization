//Redraw for zoom
function redraw() {
  svg.attr("transform",
	  "translate(" + d3.event.translate + ")"
	  + " scale(" + d3.event.scale + ")");
}