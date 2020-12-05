$(window).on('load', function(){
	console.log("a");
	$("body").css("background","#"+setKeyinit('background_color','98FB98'));
	document.getElementById('polygon_area').innerHTML=google.maps.geometry.spherical.computeArea(polygon_list).toFixed(2)+"㎡";
	var get_comment_text=Cookies.get("comment_text");
	var get_polygon_color=Cookies.get("polygon_color");
	if(get_comment_text==null || get_comment_text===undefined)get_comment_text="";
	if(get_polygon_color==null || get_polygon_color===undefined)get_polygon_color="#000000";
	if(urlCommentAutoSave==1 && (polygon_list.length!=0 || get_comment_text.length!=0 || get_polygon_color!="#000000")){
		var result=confirm("前回作成したコメントのデータがあります。ロードしますか？");
		if(result){
			document.getElementById('autosave_text').innerHTML="<p>前回作成したデータを読み込みました。</p><input type='button' value='リセット' onclick='comment_reset()'>"
			document.forms.mapForm.formComment.value=get_comment_text;
			polgon_color=get_polygon_color;
			myPolygon.setOptions({ fillColor:polygon_color,strokeColor:polygon_color});
			var polygon_center=polygon_list_center();
			if(polygon_center!=null)map.panTo(polygon_center)
		}
		else{
			comment_reset();
		}
	}
	
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
})

function getValue() {
	var $formObject = document.getElementById( "mapForm" );
	var comment_text = $formObject.formComment.value;
	if(urlCommentAutoSave==1)Cookies.set("comment_text", comment_text);
}
