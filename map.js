var map;
var map2;
var Options;
var myMapTypeId;
var myMapType;

var polygon_list=[];
var marker_list=[]
var myPolygon;

function initMap(){
	myMapType = new google.maps.StyledMapType([{"elementType": "labels","stylers": [{ "visibility": "off" }]}],{name: 'ラベルなし'});
	myMapTypeId = 'my_style';
	Options = {
		zoom: urlMapZoomKey,
		center: locate, 
		mapTypeControlOptions: {
			mapTypeIds: [google.maps.MapTypeId.ROADMAP,myMapTypeId,google.maps.MapTypeId.SATELLITE,google.maps.MapTypeId.HYBRID,google.maps.MapTypeId.TERRAIN] 
		}
	};
	createInitMap();
	viewInitMap();
}

function viewInitMap(){
	map2 = new google.maps.Map(document.getElementById('map2'), Options);
	map2.mapTypes.set(myMapTypeId, myMapType);
	map2.setMapTypeId(myMapTypeId);
}

function createInitMap(){
	var click_marker;
	var polygon_cookie_list=Cookies.get("polygon");
	var polygon_json_list;
	if(polygon_cookie_list==null || urlCommentAutoSave!=1)polygon_json_list=[]
	else polygon_json_list=JSON.parse(polygon_cookie_list);
	
	map = new google.maps.Map(document.getElementById('map'), Options);
	map.mapTypes.set(myMapTypeId, myMapType);
	map.setMapTypeId(myMapTypeId);
	
	myPolygon=new google.maps.Polygon({path:polygon_list,strokeColor:polygon_color,fillColor:polygon_color});
	myPolygon.setMap(map);
	
	if(urlCommentAutoSave==1){
		for(var i=0;i<polygon_json_list.length;i++){
			polygon_list.push(new google.maps.LatLng(polygon_json_list[i]["lat"],polygon_json_list[i]["lng"]))
			click_marker = new google.maps.Marker({
				position: polygon_json_list[i],
				map: map,
				icon:"img/pin.png",
			});
			click_marker.addListener("click",function(e){
				this.setMap(null);
				delete_list(new google.maps.LatLng(e.latLng.lat(),e.latLng.lng()));
				create_after_click();
			});
			marker_list.push(click_marker);
			myPolygon.setPath(polygon_list);
		}
	}
	
	map.addListener("click",function(e){
		polygon_list.push(new google.maps.LatLng(e.latLng.lat(),e.latLng.lng()))
		click_marker = new google.maps.Marker({
			position: e.latLng,
			map: map,
			icon:"img/pin.png",
		});
		click_marker.addListener("click",function(){
			this.setMap(null);
			delete_list(new google.maps.LatLng(e.latLng.lat(),e.latLng.lng()));
			create_after_click();
		});
		marker_list.push(click_marker);
		create_after_click();
	});
}

function create_after_click(){
	myPolygon.setPath(polygon_list);
	document.getElementById('polygon_area').innerHTML=google.maps.geometry.spherical.computeArea(polygon_list).toFixed(2)+"㎡";
	if(urlCommentAutoSave==1)Cookies.set("polygon", JSON.stringify(polygon_list));
}

function delete_list(list){
	var n=0;
	for(var i=0;i<polygon_list.length;i++){
		if(polygon_list[i].toString()==list.toString() ){
			polygon_list=new_list(polygon_list,i);
			marker_list=new_list(marker_list,i);
		}
	}
}

function map_back(){
	if(polygon_list.length>0){
		polygon_list.pop();
		marker_list[marker_list.length-1].setMap(null);
		marker_list.pop();
		create_after_click();
	}
}

function map_clear(){
	polygon_list=[]
	for(var i=0;i<marker_list.length;i++){
		marker_list[i].setMap(null);
	}
	marker_list=[]
	myPolygon.setMap(null);
	polygon_color="#000000"
	myPolygon=new google.maps.Polygon({path:polygon_list,strokeColor:polygon_color,fillColor:polygon_color});
	myPolygon.setMap(map);
	create_after_click();
}

function new_list(list,n){
	n_list=[]
	for(var i=0;i<list.length;i++){
		if(i!=n){
			n_list.push(list[i]);
		}
	}
	return n_list;
}

function map_send(){
	var input_message = document.forms.mapForm.formComment.value;
	Cookies.remove("polygon");
	Cookies.remove("comment_text");
	Cookies.remove("polygon_color");
	console.log(input_message);
}

function comment_reset(){
	map_clear();
	document.forms.mapForm.formComment.value="";
	if(urlCommentAutoSave==1)Cookies.set("comment_text","");
	if(urlCommentAutoSave==1)Cookies.set("polygon_color","");
	document.getElementById('autosave_text').innerHTML=""
}

function polygon_list_center(){
	if(polygon_list.length!=0){
		var lat=0,lng=0;
		for(var i=0;i<polygon_list.length;i++){
			lat+=polygon_list[i].lat()
			lng+=polygon_list[i].lng()
		}
		return (new google.maps.LatLng((lat/polygon_list.length),(lng/polygon_list.length),false))
	}
	else return null;
}