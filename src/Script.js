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
	.attr("height", 100 + "%")
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


var svg = d3.select("body").append("svg").attr("id", "graph").attr("width", 75 + "%").attr("height", 100 + "%").style("float", "right")
    .call(zm = d3.behavior.zoom().scaleExtent([0.25,3]).on("zoom", redraw)).on("dblclick.zoom", null).append("g")
    .attr("transform", "translate(" + 300 + "," + 50 + ")");
	

	
//necessary so that zoom knows where to zoom and unzoom from
zm.translate([300, 50]);
       
//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

update(source);

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