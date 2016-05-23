function appendText(){
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
}