function amedas(){
	$(function(){
		var insert=""
		$.getJSON(amedas_url, function(data){
		
		insert += "<table border='1'>"
		var dateArray = Object.keys(data)
		dateArray = dateArray.filter(n => n !== "場所")
		
		insert += "<tr>"
		for (const i of Object.keys(data[dateArray[0]])) {
			insert += "<th align='center'>"+i+"</th>"
		}
		insert += "</tr>"
		
		for (const i of dateArray) {
			insert += "<tr>"
			var data_type = Object.keys(data[i])
			var day=""
				for (const j of data_type) {
					var _data=data[i][j]
					if(j.match(/日付/)){
						_data=_data.slice(0,4)+"/"+_data.slice(4,6)+"/"+_data.slice(6)
						_data+="("+getDay(_data)+")"
					}
					else if(j.match(/時刻/)){
						if(_data<10)_data='0'+_data
						_data+=":00"
					}
					insert += "<td align='center'>"+_data+"</td>"
				}
			insert += "</tr>"
			document.getElementById('place_name').innerHTML=data["場所"]["観測所名"]
		}
		document.getElementById('amedas_table').innerHTML=insert
		});
	});
}

amedas()