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
		.attr("fill", function (d){
			if (d.tagName != "executionPlan" && d.tagName != undefined) {
				if (d.attributes.costs >= 0 && d.attributes.costs < totalCosts*0.1){return rectBest} 							//best
				else if(d.attributes.costs >= totalCosts *0.1 && d.attributes.costs < totalCosts*0.25){return rectVeryGood}		//very good
				else if(d.attributes.costs >= totalCosts *0.25 && d.attributes.costs < totalCosts*0.40){return rectGood}		//good
				else if(d.attributes.costs >= totalCosts *0.40 && d.attributes.costs < totalCosts*0.60){return rectFair}		//fair
				else if(d.attributes.costs >= totalCosts *0.60 && d.attributes.costs < totalCosts*0.75){return rectBad}		//bad
				else if(d.attributes.costs >= totalCosts *0.75 && d.attributes.costs < totalCosts*0.90){return rectVeryBad}		//very bad
				else {return rectWorst}																							//worst
			} else {return rectWhite}
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