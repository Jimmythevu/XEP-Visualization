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
