var icontypelist={};
icontypelist["weathernews"]=1024;

var preplace=Cookies.get('place');
if (preplace===undefined||preplace==null)preplace="ume"

var urlPlaceKey=setKeyinit('place',preplace);

$.ajax({
	url: "https://raw.githubusercontent.com/s1715-kudo/weather/gh-pages/amedas/"+urlPlaceKey+".json",
	type: 'GET',
	statusCode: {
		404: function() {
			alert('対応していない場所です！');
			window.location.href = (location.href.replace("place="+encodeURIComponent(urlPlaceKey),"place=ume"))
		}
	}
});

Cookies.set('place',urlPlaceKey,{expires:7});

var urlForecastIconKey=setKeyinit('forecast_icon',0);
var urlForecastStringKey=setKeyinit('forecast_string',1);
var urlMapZoomKey=setKeyinit('map_zoom',13);
var polygon_color="#000000"
var urlCommentAutoSave=setKeyinit('comment_auto_save',1);
if(urlCommentAutoSave!=1){
	Cookies.remove("polygon");
	Cookies.remove("comment_text");
	Cookies.remove("polygon_color");
}

var urlForecastKey=setKeyinit('forecast',0);
if(urlForecastKey==1){
	urlForecastIconKey=icontypelist["weathernews"];
	urlForecastStringKey=0;
}

var amedas_url="https://raw.githubusercontent.com/s1715-kudo/weather/gh-pages/amedas/"+urlPlaceKey+".json"
var forecast_url="https://raw.githubusercontent.com/s1715-kudo/weather/gh-pages/forecast/"+urlPlaceKey+".json"

var locate={lat:33.2375507,lng:131.6192692};
$.ajaxSetup({async: false});
$.getJSON(amedas_url, function(data){
	locate={lat:data["場所"]["geocoding"][0],lng:data["場所"]["geocoding"][1]}
});
$.ajaxSetup({async: true});
locate={lat:setKeyinit("map_lat",locate["lat"]),lng:setKeyinit("map_lng",locate["lng"])}

function getDay(str) {
	var dw=new Date (str).getDay();
	var list=["日","月","火","水","木","金","土"];
	return list[dw];
}

function getParam(name, url) {
	if (!url) url = window.location.href;
	name = name.replace(/[\[\]]/g, "\\$&");
	var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
		results = regex.exec(url);
	if (!results) return null;
	if (!results[2]) return '';
	return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function setKeyinit(key,value){
	var url_key=getParam(key);
	if(url_key==null)url_key=value;
	else if((typeof value)=="number")url_key=Number(url_key);
	return url_key;
}

$(document).ready(function(e) {
	$('img[usemap]').rwdImageMaps();
});

$(function() {
	size();
	$(window).on("resize", function() {size();});
	function size() {
		width = $(window).width();
		var small=false;
		var small2=false;
		if(width<=300)small2=true
		if(width<=900)small=true;
		amedas(small,small2)
		forecast(small,small2)
	}
	
	$("#select_color").on("change", function(){
		polygon_color=$(this).val()
		myPolygon.setOptions({ fillColor:polygon_color,strokeColor:polygon_color});
		if(urlCommentAutoSave==1)Cookies.set("polygon_color",polygon_color);
	});
});
