function amedas(small){
	var std_output_list=["日付","時刻","気温","降水量","風向","風速","日照時間"]
	$(function(){
		var insert=""
		$.getJSON(amedas_url, function(data){
		unit_list=[]
		unit_list["気温"]="℃"
		unit_list["湿度"]="％"
		unit_list["湿度"]="Pa"
		unit_list["降水量"]="mm"
		unit_list["風速"]="m/s"
		unit_list["日照時間"]="h"
		unit_list["積雪深"]="cm"
		
		insert += "<table border='1' style='border-collapse: collapse'>"
		var dateArray = Object.keys(data)
		dateArray = dateArray.filter(n => n !== "場所")
		
		insert += "<tr>"
		for (const i of Object.keys(data[dateArray[0]])) {
			if((std_output_list.includes(i)&&small)||!small){
				insert += "<th align='center'>"+i+"</th>"
			}
		}
		insert += "</tr>"
		
		for (const i of dateArray) {
			insert += "<tr>"
			var data_type = Object.keys(data[i])
			var day=""
				for (const j of data_type) {
					if((std_output_list.includes(j)&&small)||!small){
						var _data=data[i][j]
						if(j.match(/日付/)){
							_data=_data.slice(0,4)+"/"+_data.slice(4,6)+"/"+_data.slice(6)
							_data+="("+getDay(_data)+")"
						}
						else if(j.match(/時刻/)){
							if(_data<10)_data='0'+_data
							_data+=":00"
						}
						unit_text=unit_list[j]
						if(typeof unit_text==="undefined")unit_text=""
						if(_data=="-")unit_text=""
						insert += "<td align='center'>"+_data+unit_text+"</td>"
					}
				}
			insert += "</tr>"
			document.getElementById('place_name').innerHTML=data["場所"]["観測所名"]
		}
		document.getElementById('amedas_table').innerHTML=insert
		});
	});
}

amedas(false)