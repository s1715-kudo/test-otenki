window.onload = function() {
	$("body").css("background","#"+setKeyinit('background_color','98FB98'));
	document.getElementById('polygon_area').innerHTML=google.maps.geometry.spherical.computeArea(polygon_list).toFixed(2)+"㎡";
	if(urlPolygonAutoSave==1 && polygon_list.length!=0)document.getElementById('autosave_text').innerHTML="<p>前回作成したデータを読み込みました。</p>"
	
	getValue();
	var $formObject = document.getElementById( "mapForm" );
	for( var $i = 0; $i < $formObject.length; $i++ ) {
		$formObject.elements[$i].onkeyup = function(){
			getValue();
		};
		$formObject.elements[$i].onchange = function(){
			getValue();
		};
	}
};

function getValue() {
	var $formObject = document.getElementById( "mapForm" );
	var a = $formObject.formComment.value;
	console.log(a)
}