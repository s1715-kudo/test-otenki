window.onload = function() {
	$("body").css("background","#"+setKeyinit('background_color','98FB98'));
	document.getElementById('polygon_area').innerHTML=google.maps.geometry.spherical.computeArea(polygon_list).toFixed(2)+"㎡";
	if(urlPolygonAutoSave==1)document.getElementById('autosave_text').innerHTML="<p>前回作成したデータを読み込みました。</p>"

	var $formObject=document.getElementById( "map_form" );
	var comment
	comment=$formObject.map_comment.value;
	console.log(comment)
	for( var $i = 0; $i < $formObject.length; $i++ ) {
		$formObject.elements[$i].onkeyup = function(){
			comment=$formObject.map_comment.value;
			console.log(comment)
		};
		$formObject.elements[$i].onchange = function(){
			comments=$formObject.map_comment.value;
			console.log(comment)
		};
	}
};