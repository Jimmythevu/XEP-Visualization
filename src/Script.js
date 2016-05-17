//--------------------------------------------------------------------------------
//DER TEIL MUSST GEÄNDERT WERDEN UM ANDERE AUSFÜHRUNGS PLÄNE ZU VISUALISIEREN 
//-------------------------------------------------------------------------------- 	

var selection = d3.xml("XEP_samp/bsp1.xml", function(error, data) {
	if (error) console.log(error);
	var JsonData = xmlToJSON(data)
	update(root = JsonData)
});


 	
//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

//change XML to JASON
function xmlToJSON(xml) {
    var o = {"tagName": xml.tagName};
    if(xml.attributes) {
        o.attributes = [];
        Array.prototype.forEach.call(xml.attributes, 
              function(a){
                  o.attributes[a.name] = a.value;
              }); //treat the attribute	s node list as an array
                  //and add each attribute to the object
    }
    if (xml.textContent&&xml.textContent.length) {
        o["textContent"] = xml.textContent.trim();
    }
    if (xml.children.length) {        
        o.children = Array.prototype.map.call(xml.children,
                    function(child) {
					if (o.tagName == "join")
					return xmlToJSON(child.firstElementChild)
                    else return xmlToJSON(child);
                    });
                //replace each xml object in the child array
                //with its JSON-ified version
    }
    
    return o;
}


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


	
    nodeEnter.append("text")
        .attr("x", rectW / 2)
        .attr("y", rectH /2)
        .attr("dy", ".35em")
        .attr("text-anchor", "middle")
		.attr("font-weight", "bold")
        .text(function (d) {
		if (d.tagName == "tableAccess" || 
			d.tagName == "tableDelete" || 
			d.tagName == "tableInsert" || 
			d.tagName == "tableUpdate" || 
			d.tagName == "tableMerge"){
		return d.tagName + "[" + d.attributes.tableType + "]"
		}
		else if (d.tagName == "indexAccess" || 
				d.tagName == "indexDelete" || 
				d.tagName == "indexInsert" || 
				d.tagName == "indexUpdate" || 
				d.tagName == "indexMerge"){
		return d.tagName + "[" + d.attributes.indexType + "]"
		}
		else if (d.tagName != undefined || 
				d.tagName == "executionPlan") return d.tagName
		});
		
	nodeEnter.append("text")
		.attr("transform","translate(0,12)")
		.attr("x", rectW / 2)
        .attr("y", rectH /2)
        .attr("dy", ".35em")
        .attr("text-anchor", "middle")
        .text(function (d) {
		if (d.tagName == "executionPlan"){return "StatementType: " + d.attributes.statementType}
		else if (d.tagName == "indexAccess" || 
				d.tagName == "indexDelete" || 
				d.tagName == "indexInsert" || 
				d.tagName == "indexUpdate" || 
				d.tagName == "indexMerge"){
			return d.attributes.indexSchema  + "." + d.attributes.indexName}
		else if (d.tagName == "tableAccess" || 
				d.tagName == "tableDelete" || 
				d.tagName == "tableInsert" || 
				d.tagName == "tableUpdate" || 
				d.tagName == "tableMerge"){
			return d.attributes.tableSchema + "." + d.attributes.tableName}		
		else if (d.tagName != undefined) {return "rows: " + d.attributes.rows}
		});
	nodeEnter.append("text")
		.attr("transform","translate(0,24)")
		.attr("x", rectW / 2)
        .attr("y", rectH /2)
        .attr("dy", ".35em")
        .attr("text-anchor", "middle")
        .text(function (d) {
		if (	d.tagName == "indexAccess" || 
				d.tagName == "indexDelete" || 
				d.tagName == "indexInsert" || 
				d.tagName == "indexUpdate" || 
				d.tagName == "indexMerge"){
			return "rows: " + d.attributes.rows}
		else if (d.tagName == "tableAccess" || 
				d.tagName == "tableDelete" || 
				d.tagName == "tableInsert" || 
				d.tagName == "tableUpdate" || 
				d.tagName == "tableMerge"){
			return "rows: " + d.attributes.rows}
		else if (d.tagName != undefined) {return "Costs Total/CPU/IO:"}
			
		});
	nodeEnter.append("text")
		.attr("transform","translate(0,36)")
		.attr("x", rectW / 2)
        .attr("y", rectH /2)
        .attr("dy", ".35em")
        .attr("text-anchor", "middle")
        .text(function (d) {
		if (d.tagName == "executionPlan"){return d.attributes.totalCosts + " / " + d.attributes.totalCostsCPU + " / " + d.attributes.totalCostsIO}
		else if (d.tagName == "indexAccess" || 
				d.tagName == "indexDelete" || 
				d.tagName == "indexInsert" || 
				d.tagName == "indexUpdate" || 
				d.tagName == "indexMerge"){
			return "Costs Total/CPU/IO:"}
		else if (d.tagName == "tableAccess" || 
				d.tagName == "tableDelete" || 
				d.tagName == "tableInsert" || 
				d.tagName == "tableUpdate" || 
				d.tagName == "tableMerge"){
			return "Costs Total/CPU/IO:"}
		else if (d.tagName != undefined){return d.attributes.costs + " / " + d.attributes.costsCPU + " / " + d.attributes.costsIO}
		});
	nodeEnter.append("text")
		.attr("transform","translate(0,48)")
		.attr("x", rectW / 2)
        .attr("y", rectH /2)
        .attr("dy", ".35em")
        .attr("text-anchor", "middle")
        .text(function (d) {
		if (d.tagName == "executionPlan"){
		return ""}
		else if (d.tagName == "indexAccess" || 
				d.tagName == "indexDelete" || 
				d.tagName == "indexInsert" || 
				d.tagName == "indexUpdate" || 
				d.tagName == "indexMerge"){
			return d.attributes.costs + " / " + d.attributes.costsCPU + " / " + d.attributes.costsIO}
		});
	nodeEnter.append("text")
		.attr("transform","translate(0,48)")
		.attr("x", rectW / 2)
        .attr("y", rectH /2)
        .attr("dy", ".35em")
        .attr("text-anchor", "middle")
        .text(function (d) {
		if (d.tagName == "executionPlan"){
		return ""}
		else if (d.tagName == "tableAccess" || 
				d.tagName == "tableDelete" || 
				d.tagName == "tableInsert" || 
				d.tagName == "tableUpdate" || 
				d.tagName == "tableMerge"){
				return d.attributes.costs + " / " + d.attributes.costsCPU + " / " + d.attributes.costsIO}
		});

		

	//images
			
	node.append("image")
		.attr("xlink:href", function (d){
		if (d.tagName == "executionPlan"){return "gfx/ex_result.png"}
		//manipulation
		else if (d.tagName == "tableInsert"){return "gfx/ex_insert.png"}
		else if (d.tagName == "indexInsert"){return "gfx/ex_index_insert.png"}
		else if (d.tagName == "tableUpdate"){return "gfx/ex_update.png"}
		else if (d.tagName == "indexUpdate"){return "gfx/ex_index_update.png"}
		else if (d.tagName == "tableDelete"){return "gfx/ex_delete.png"}
		else if (d.tagName == "indexDelete"){return "gfx/ex_index_delete.png"}
		else if (d.tagName == "tableMerge"){return "gfx/ex_merge.png"}
		else if (d.tagName == "indexMerge"){return "gfx/ex_index_merge.png"}
		else if (d.tagName == "remoteDelete"){return "gfx/ex_remote_delete.png"}
		else if (d.tagName == "remoteInsert"){return "gfx/ex_remote_insert.png"}
		else if (d.tagName == "remoteMerge"){return "gfx/ex_remote_merge.png"}
		else if (d.tagName == "remoteUpdate"){return "gfx/ex_remote_update.png"}
		//intermediate
		else if (d.tagName == "join"){return "gfx/ex_join.png"}
		else if (d.tagName == "set"){return "gfx/ex_setop.png"}
		else if (d.tagName == "sort"){return "gfx/ex_sort.png"}
		else if (d.tagName == "aggregate"){return "gfx/ex_aggregate.png"}
		else if (d.tagName == "filter"){return "gfx/ex_filter.png"}
		else if (d.tagName == "bitmap"){return "gfx/ex_bitmap.png"}
		//access
		else if (d.tagName == "generatedRowAccess"){return "gfx/ex_scan.png"}
		else if (d.tagName == "multiObjectAccess"){return "gfx/ex_multi_object_access.png"}
		else if (d.tagName == "multiTableInsert"){return "gfx/ex_multi_object_insert.png"}
		else if (d.tagName == "multiTableDelete"){return "gfx/ex_multi_object_delete.png"}
		else if (d.tagName == "multiTableUpdate"){return "gfx/ex_multi_object_update.png"}
		else if (d.tagName == "cacheAccess"){return "gfx/ex_cache.png"} //zu ändern
		else if (d.tagName == "tableAccess"){return "gfx/ex_scan.png"}
		else if (d.tagName == "indexAccess"){return "gfx/ex_index_access.png"}
		else if (d.tagName == "remoteAccess"){return "gfx/ex_remote_access.png"}
		/*//other
		else if (d.tagName == "joinMethod"){return "ex_unknown.png"}
		else if (d.tagName == "setType"){return "ex_setop.png"}
		else if (d.tagName == "tableAccessType"){return "ex_unknown.png"}
		else if (d.tagName == "multiObjectAccessType"){return "ex_unknown.png"}
		else if (d.tagName == "tableType"){return "ex_unknown.png"}
		else if (d.tagName == "indexType"){return "ex_unknown.png"}
		else if (d.tagName == "otherOperator"){return "file:///C:/Users/Hoang/Desktop/new%20try/gfx/ex_unknown.png"}*/
		else {return"gfx/ex_unknown.png"}
		})
		.attr("x", rectW /2.5)
		.attr("y", rectH - 110)
		.attr("width", 40)
		.attr("height", 40);	

    nodeEnter.append("rect")
        .attr("width", rectW)
		.attr("class",function (d){
			return d._children ? "rectLightsteelblue" : "rectWhite"
		})
        .attr("height", rectH)
        .attr("stroke", "white")
        .attr("stroke-width", 1)
		.on ("mouseover", function (){
			tmpClass = $(this).attr('class');
			console.log (tmpClass)
			return d3.select(this).attr ("class", "rectGrey")
		})
		.on ("mouseout", function (){
			return d3.select(this).attr ("class", tmpClass)
		});
		
	// Transition nodes to their new position.
    nodeUpdate = node.transition()
        .duration(duration)
        .attr("transform", function (d) {
        return "translate(" + d.x + "," + d.y + ")";
    });			
		
    nodeUpdate.select("text")
        .style("fill-opacity", 1);
		
    nodeUpdate.select("rect")
		.attr("ry", 20)
		.attr("rx", 20)
        .attr("width", rectW)
        .attr("height", rectH)
        .attr("stroke", "white")
        .attr("stroke-width", 1)
		.attr("class", function (d){
			return d._children ? "rectLightsteelblue" : "rectWhite"
		});	

    // Transition exiting nodes to the parent's new position.
    var nodeExit = node.exit().transition()
        .duration(duration)
        .attr("transform", function (d) {
        return "translate(" + source.x + "," + source.y + ")";
    })
        .remove();
		
    nodeExit.select("rect")
        .attr("width", rectW)
        .attr("height", rectH)

    nodeExit.select("text");	
		
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
//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
function evaCosts(){
//coloured nodes for evaluation	
	var totalCosts;
    nodes.forEach(function (d) {
		if (d.tagName == "executionPlan"){totalCosts = d.attributes.totalCosts}
    });
		
		node.transition()
        .duration(duration)
        .attr("transform", function (d) {
        return "translate(" + d.x + "," + d.y + ")";
		})
		.select("rect")
        .attr("width", rectW)
        .attr("height", rectH)
        .attr("stroke", "white")
        .attr("stroke-width", 1)	
		.attr("class", function (d){
			if (d.tagName != "executionPlan" && d.tagName != undefined) {
				if (d.attributes.costs >= 0 && d.attributes.costs < totalCosts*0.1){return "rectBest"} 							//best
				else if(d.attributes.costs >= totalCosts *0.1 && d.attributes.costs < totalCosts*0.25){return "rectVeryGood"}		//very good
				else if(d.attributes.costs >= totalCosts *0.25 && d.attributes.costs < totalCosts*0.40){return "rectGood"}		//good
				else if(d.attributes.costs >= totalCosts *0.40 && d.attributes.costs < totalCosts*0.60){return "rectFair"}		//fair
				else if(d.attributes.costs >= totalCosts *0.60 && d.attributes.costs < totalCosts*0.75){return "rectBad"}		//bad
				else if(d.attributes.costs >= totalCosts *0.75 && d.attributes.costs < totalCosts*0.90){return "rectVeryBad"}		//very bad
				else {return"rectWorst"}																							//worst
			} else {return "rectWhite"}
		})
        /*.style("fill", function (d) {
        if (d.tagName != "executionPlan" && d.tagName != undefined)  {			
				if (d.attributes.costs >= 0 && d.attributes.costs < totalCosts*0.1){return "#3C3"} 							//best
				else if(d.attributes.costs >= totalCosts *0.1 && d.attributes.costs < totalCosts*0.25){return "#9C3"}		//very good
				else if(d.attributes.costs >= totalCosts *0.25 && d.attributes.costs < totalCosts*0.40){return "#CC3"}		//good
				else if(d.attributes.costs >= totalCosts *0.40 && d.attributes.costs < totalCosts*0.60){return "#FC3"}		//fair
				else if(d.attributes.costs >= totalCosts *0.60 && d.attributes.costs < totalCosts*0.75){return "#F63"}		//bad
				else if(d.attributes.costs >= totalCosts *0.75 && d.attributes.costs < totalCosts*0.90){return "#F33"}		//very bad
				else {return"#C00"}																							//worst
			
		}
		else {return "#fff"};
		});*/ 
}
//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
function evaCostsCPU(){
//coloured nodes for evaluation	
	var totalCostsCPU;
    nodes.forEach(function (d) {
		if (d.tagName == "executionPlan"){totalCostsCPU = d.attributes.totalCostsCPU}
    });
		
		node.transition()
        .duration(duration)
        .attr("transform", function (d) {
        return "translate(" + d.x + "," + d.y + ")";
		})
		.select("rect")
        .attr("width", rectW)
        .attr("height", rectH)
        .attr("stroke", "white")
        .attr("stroke-width", 1)	
		.attr("class", function (d){
			if (d.tagName != "executionPlan" && d.tagName != undefined) {
				if (d.attributes.costsCPU >= 0 && d.attributes.costsCPU < totalCostsCPU*0.1){return "rectBest"} 							//best
				else if(d.attributes.costsCPU >= totalCostsCPU *0.1 && d.attributes.costsCPU < totalCostsCPU*0.25){return "rectVeryGood"}		//very good
				else if(d.attributes.costsCPU >= totalCostsCPU *0.25 && d.attributes.costsCPU < totalCostsCPU*0.40){return "rectGood"}		//good
				else if(d.attributes.costsCPU >= totalCostsCPU *0.40 && d.attributes.costsCPU < totalCostsCPU*0.60){return "rectFair"}		//fair
				else if(d.attributes.costsCPU >= totalCostsCPU *0.60 && d.attributes.costsCPU < totalCostsCPU*0.75){return "rectBad"}		//bad
				else if(d.attributes.costsCPU >= totalCostsCPU *0.75 && d.attributes.costsCPU < totalCostsCPU*0.90){return "rectVeryBad"}		//very bad
				else {return"rectWorst"}																							//worst
			} else {return "rectWhite"}
		}) 
}
//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

function evaCostsIO(){
//coloured nodes for evaluation	
	var totalCostsIO;
    nodes.forEach(function (d) {
		if (d.tagName == "executionPlan"){totalCostsIO = d.attributes.totalCostsIO}
    });
		
		node.transition()
        .duration(duration)
        .attr("transform", function (d) {
        return "translate(" + d.x + "," + d.y + ")";
		})
		.select("rect")
        .attr("width", rectW)
        .attr("height", rectH)
        .attr("stroke", "white")
        .attr("stroke-width", 1)	
		.attr("class", function (d){
			if (d.tagName != "executionPlan" && d.tagName != undefined) {
				if (d.attributes.costsIO >= 0 && d.attributes.costsIO < totalCostsIO*0.1){return "rectBest"} 							//best
				else if(d.attributes.costsIO >= totalCostsIO *0.1 && d.attributes.costsIO < totalCostsIO*0.25){return "rectVeryGood"}		//very good
				else if(d.attributes.costsIO >= totalCostsIO *0.25 && d.attributes.costsIO < totalCostsIO*0.40){return "rectGood"}		//good
				else if(d.attributes.costsIO >= totalCostsIO *0.40 && d.attributes.costsIO < totalCostsIO*0.60){return "rectFair"}		//fair
				else if(d.attributes.costsIO >= totalCostsIO *0.60 && d.attributes.costsIO < totalCostsIO*0.75){return "rectBad"}		//bad
				else if(d.attributes.costsIO >= totalCostsIO *0.75 && d.attributes.costsIO < totalCostsIO*0.90){return "rectVeryBad"}		//very bad
				else {return"rectWorst"}																							//worst
			} else {return "rectWhite"}
		}) 
}
//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
function evaRows(){
//coloured nodes for row evaluation	
	var rowsArray = new Array;
	var i = 0;
    nodes.forEach(function (d) {
		if (d.tagName != undefined){
			rowsArray[i] = d.attributes.rows;
			i++;
		}
    });
	var totalRows = Math.max(...rowsArray);	
	
	node.transition()
	.duration(duration)
	.attr("transform", function (d) {
	return "translate(" + d.x + "," + d.y + ")";
	})
	.select("rect")
	.attr("width", rectW)
	.attr("height", rectH)
	.attr("stroke", "white")
	.attr("stroke-width", 1)
	.attr("class", function(d){
		if (d.tagName != undefined)  {			
			if (d.attributes.rows >= 0 && d.attributes.rows < totalRows*0.1){return "rectBest"} 						//best
			else if(d.attributes.rows >= totalRows *0.1 && d.attributes.rows < totalRows*0.25){return "rectVeryGood"}		//very good
			else if(d.attributes.rows >= totalRows *0.25 && d.attributes.rows < totalRows*0.40){return "rectGood"}		//good
			else if(d.attributes.rows >= totalRows *0.40 && d.attributes.rows < totalRows*0.60){return "rectFair"}		//fair
			else if(d.attributes.rows >= totalRows *0.60 && d.attributes.rows < totalRows*0.75){return "rectBad"}		//bad
			else if(d.attributes.rows >= totalRows *0.75 && d.attributes.rows < totalRows*0.90){return "rectVeryBad"}		//very bad
			else {return"rectWorst"}																						//worst
		
		}
		else {return "rectWhite"};			
	})
}	
//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Show tooltip when mouse over		
var tooltip = d3.select("body").append("div")
		.attr("class", "tooltip")
		.attr("stroke", "black")
		.attr("stroke-width", 1)
		.style("width", 20 + "%")
		.style({position:"absolute",
			   visibility:"hidden"});
			   
			   
function mouseover (d){
	var content ="";
	if (d.attributes){
	  content +=
		d3.entries(d.attributes).map(function(o){
		  return "<dt>"+o.key+ ": " + o.value + "</dt>"
	  } ).join(" ");
	}
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



var tooltip2 = d3.select("body").append("div")
	.attr("class", "tooltip2")
	.style("width", 20 + "%")
	.style({position:"absolute",
		visibility:"hidden"});

//tooltip on click				
function click (d){
	var content2 ="";
	if (d.attributes){
	  content2 +=
		d3.entries(d.attributes).map(function(o){
		  return "<dt>"+o.key+ ": " + o.value + "</dt>"
	  } ).join(" ");
	}
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



// hide tooltip when mouse outline
function mouseout (d){
	tooltip.style("visibility", "hidden")
	tooltip2.style("visibility", "visible")
	}


// Collapse tree on double click.
function dblclick(d) {
	if (d.children) {
		d._children = d.children;
		d.children = null;
	} else {
		d.children = d._children;
		d._children = null;
	}
	update(d);
}

//Redraw for zoom
function redraw() {
  svg.attr("transform",
	  "translate(" + d3.event.translate + ")"
	  + " scale(" + d3.event.scale + ")");
}

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
function hideAddtionalLink(){
		svg.selectAll("path.additionalParentLink").remove();
}
//-------------------------------------------------------------------------------- 

