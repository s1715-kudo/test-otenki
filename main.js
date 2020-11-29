var urlPlaceKey=setKeyinit('place','ume');
var urlForecastIconKey=setKeyinit('forecast_icon',0);
var urlMapZoomKey=setKeyinit('map_zoom',13);
var polygon_color="#"+setKeyinit('polygon_color','000000');
var urlPolygonAutoSave=setKeyinit('polygon_auto_save',1);
if(urlPolygonAutoSave!=1)Cookies.remove("polygon");

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

$(function(){
	getValue();
	$('#mapForm textarea').on('blur keydown keyup keypress change',function(){
		getValue();
	});
});

function getValue() {
	console.log($('textarea[name=formComent]').val());
}