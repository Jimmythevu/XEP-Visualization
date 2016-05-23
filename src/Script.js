//--------------------------------------------------------------------------------
//DER TEIL MUSST GEÄNDERT WERDEN UM ANDERE AUSFÜHRUNGS PLÄNE ZU VISUALISIEREN 
//-------------------------------------------------------------------------------- 	

var selection = d3.xml("XEP_samp/bsp1.xml", function(error, data) {
	if (error) console.log(error);
	var JsonData = xmlToJSON(data)
	update(root = JsonData)
});

//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

var margin = {
top: 20,
right: 120,
bottom: 20,
left: 120
},
	width = 1200 - margin.right - margin.left,
	height = 1400 - margin.top - margin.bottom,
	i = 0,
	root,
	duration = 1000,
	rectW = 230,
	rectH = 120,
	selectedColor = "blue",
	collapsedColor = "#b0c4de",
	selectedAndCollapsed = "darkblue",
	rectBest = "#3C3",
	rectVeryGood = "#9C3",
	rectGood = "#CC3",
	rectFair = "#FC3",
	rectBad = "#F63",
	rectVeryBad = "#F33",
	rectWorst = "#C00",
	rectWhite = "white",
	nodes,
	links,
	node,
	nodeEnter,
	nodeUpdate,
	additionalLink;

var tree = d3.layout.tree().nodeSize([240, 50]);
var diagonal = d3.svg.diagonal()
	.projection(function (d) {
	return [d.x + rectW / 2, d.y + rectH / 2];
});

var leftSVG = d3.select("body")
	.append("svg")
	.attr("width", 25 + "%")
	.attr("height", 1000)
	.attr("border", 1)
	.style("background", "lightblue")
	.style("opacity", 0.2)
	.style("float", "left");
/*
var borderPath = d3.select("svg").append("rect")
	.attr("x", 0)
	.attr("y", 0)
	.attr("height", 1000)
	.attr("width", 100 + "%" )
	.style("stroke", "black")
	.style("fill", "none")
	.style("stroke-width", 1);    */


var svg = d3.select("body").append("svg").attr("id", "graph").attr("width", 75 + "%").attr("height", 1000).style("float", "right")
    .call(zm = d3.behavior.zoom().scaleExtent([0.25,3]).on("zoom", redraw)).on("dblclick.zoom", null).append("g")
    .attr("transform", "translate(" + 300 + "," + 50 + ")");
	

	
//necessary so that zoom knows where to zoom and unzoom from
zm.translate([300, 50]);
       
//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


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
//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
/* $(document).ready(function() {
	initEventListner();
	processHighlighting();
});

// events
$('#highlighting-switch').change(function() {
  processHighlighting();
});

$('#radio-based-on').change(function() {
  processRadioBasedOn();
});

function initEventListner() {
	$('#highlighting-switch').change(function() {
	  processHighlighting();
	});

	$('#radio-based-on').change(function() {
	  processRadioBasedOn();
	});
}

function processHighlighting() {
	if ($("#highlighting-switch option:selected").val() == "on") {
  	$("#radio-based-on input[type='radio']").checkboxradio("enable");
  } else {
  	$("#radio-based-on input[type='radio']").checkboxradio('disable');
  }
  processRadioBasedOn();
}

function processRadioBasedOn() {
  if ($("#radio-based-on .ui-radio").hasClass("ui-disabled") == true || $("#radio-based-on :radio:checked").val() == "type") {
    $("#focus-select").selectmenu("disable");
  	$("#focus-select").find("option").remove();
    $('<option value="none">---</option>').appendTo($("#focus-select"));
    $("#focus-select").trigger("change");
  } else {
    $("#focus-select").selectmenu("enable");
    $("#focus-select").find("option").remove();
  	$('<option value="rows">Rows</option>').appendTo($("#focus-select"));
    $('<option value="costs">Overall Costs</option>').appendTo($("#focus-select"));
    $('<option value="costsCPU">CPU Costs</option>').appendTo($("#focus-select"));
    $('<option value="costsIO">I/O Costs</option>').appendTo($("#focus-select"));
    $("#focus-select").trigger("change");
	$("#focus-select").change(function(){
      var data= $(this).val();
	  if (data == "rows"){console.log("option 1 selected")} 
	  else if (data == "costs"){console.log("option 2 selected")}
	  else if (data == "costsCPU"){console.log("option 3 selected")}
	  else if (data == "costsIO"){console.log("option 4 selected")}
    });
  }
}
  */