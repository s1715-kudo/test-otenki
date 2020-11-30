window.onload = function() {
	$("body").css("background","#"+setKeyinit('background_color','98FB98'));
	document.getElementById('polygon_area').innerHTML=google.maps.geometry.spherical.computeArea(polygon_list).toFixed(2)+"㎡";
	var get_comment_text=Cookies.get("comment_text");
	if(get_comment_text==null || get_comment_text===undefined)get_comment_text="";
	if(urlCommentAutoSave==1 && (polygon_list.length!=0 || get_comment_text.length!=0)){
		var result=confirm("前回作成したデータがあります。<br>ロードしますか？");
		if(result){
			document.getElementById('autosave_text').innerHTML="<p>前回作成したデータを読み込みました。</p><input type='button' value='リセット' onclick='comment_reset()'>"
			document.forms.mapForm.formComment.value=get_comment_text;
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
};

function getValue() {
	var $formObject = document.getElementById( "mapForm" );
	var comment_text = $formObject.formComment.value;
	if(urlCommentAutoSave==1)Cookies.set("comment_text", comment_text);
}