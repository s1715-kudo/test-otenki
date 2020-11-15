var fl=["2days","10days"]
var fn=0

function click_forecast(){
	fn=(fn+1)%fl.length
	forecast()
}

function forecast(){
	$(function(){
		var insert=""
		$.getJSON(forecast_url, function(data){
		
		insert += "<table border='1'>"
		var dateArray = Object.keys(data[fl[fn]])
		for (const i of Object.keys(data[fl[fn]][dateArray[0]])) {
			if(i!="icon"){
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
				if(j!="icon"){
					var _data=data[fl[fn]][i][j]
					if(j.match(/日付/)){
						_data=_data.slice(0,4)+"/"+_data.slice(4,6)+"/"+_data.slice(6)
						_data+="("+getDay(_data)+")"
					}
					insert += "<td align='center'>"+_data+"</td>"
				}
				else if(urlForecastIconKey!=0 && j=="icon"){
					var _data=data[fl[fn]][i][j]
					insert += "<td align='center'><img src='"+_data+"' width='25%' height='25%'></td>"
				}
			}
			insert += "</tr>"
		}
		document.getElementById('forecast_table').innerHTML=insert
		});
		document.getElementById('forecast_button').innerHTML=fl[(fn+1)%fl.length]
	});
}

forecast()