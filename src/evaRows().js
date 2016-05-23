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
	.attr("fill", function(d){
		if (d.tagName != undefined)  {			
			if (d.attributes.rows >= 0 && d.attributes.rows < totalRows*0.1){return rectBest} 						//best
			else if(d.attributes.rows >= totalRows *0.1 && d.attributes.rows < totalRows*0.25){return rectVeryGood}		//very good
			else if(d.attributes.rows >= totalRows *0.25 && d.attributes.rows < totalRows*0.40){return rectGood}		//good
			else if(d.attributes.rows >= totalRows *0.40 && d.attributes.rows < totalRows*0.60){return rectFair}		//fair
			else if(d.attributes.rows >= totalRows *0.60 && d.attributes.rows < totalRows*0.75){return rectBad}		//bad
			else if(d.attributes.rows >= totalRows *0.75 && d.attributes.rows < totalRows*0.90){return rectVeryBad}		//very bad
			else {return rectWorst}																						//worst
		
		}
		else {return rectWhite};			
	})
}	