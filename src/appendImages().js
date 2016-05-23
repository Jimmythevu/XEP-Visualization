//images
function appendImages(){
			
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
		//other
		else {return"gfx/ex_unknown.png"}
		})
		.attr("x", rectW /2.5)
		.attr("y", rectH - 110)
		.attr("width", 40)
		.attr("height", 40);	
}