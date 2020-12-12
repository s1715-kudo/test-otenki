var fl=["2days","10days"]
var fn=0

function click_forecast(){
	fn=(fn+1)%fl.length
	forecast(false,false)
}

function forecast(small,small2){
	$(function(){
		var insert="<br>"
		$.getJSON(forecast_url, function(data){
		var unit_list=[]
		unit_list["降水量"]="mm/h"
		unit_list["降水確率"]="%"
		unit_list["気温"]="℃"
		unit_list["最高気温"]="℃"
		unit_list["最低気温"]="℃"
		unit_list["風速"]="m/s"
		
		insert += "<table border='1' style='border-collapse: collapse'>"
		var dateArray = Object.keys(data[fl[fn]])
		for (const i of Object.keys(data[fl[fn]][dateArray[0]])) {
			if(i!="icon" && !(i=="天気"&&urlForecastStringKey==0)){
				insert += "<th align='center'>"+i+"</th>"
			}
			else if(i=="icon" && urlForecastIconKey!=0){
				insert += "<th align='center'>天気</th>"
			}
		}
		insert += "</tr>"
		for (const i of dateArray) {
			insert += "<tr>"
			var data_type = Object.keys(data[fl[fn]][i])
			for (const j of data_type) {
				if(j!="icon" && !(j=="天気"&&urlForecastStringKey==0)){
					var _data=data[fl[fn]][i][j]
					var td_color=""
					var unit_text=unit_list[j]
					if(typeof unit_text==="undefined")unit_text=""
					if(j.match(/日付/)){
						_data=_data.slice(0,4)+"/"+_data.slice(4,6)+"/"+_data.slice(6)
						var getday=getDay(_data)
						unit_text+="("+getday+")"
						if(getday=="土")td_color="class='font_blue'"
						if(getday=="日" || isHoliday(_data))td_color="class='font_red'"
						if(small2){
							_data=_data.slice(5);
						}
					}
					insert += "<td align='center'>"+_data+"<span "+td_color+">"+unit_text+"</span></td>"
				}
				else if(urlForecastIconKey!=0 && j=="icon"){
					var _data="img/logo.png";
					var icon_size=30;
					var aspect=1
					if(urlForecastIconKey==1){
						_data=data[fl[fn]][i][j]
						aspect=152/112
					}
					if(small)icon_size=20;
					if(small2)icon_size=10;
					insert += "<td align='center'><img src='"+_data+"' width="+Math.round(icon_size*aspect)+"px height="+icon_size+"px></td>"
				}
			}
			insert += "</tr>"
		}
		document.getElementById('forecast_table').innerHTML=insert
		});
		document.getElementById('forecast_button').innerHTML=fl[(fn+1)%fl.length]+"に切り替え"
	});
}

forecast(false,false)