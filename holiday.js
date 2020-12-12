function isHoliday(date) {
	var url='https://holidays-jp.github.io/api/v1/date.json'
	var flag=false;
	$.ajaxSetup({async: false});
	$.getJSON(url, (data) => {
		var date_key=date.replace("/","-").replace("/","-");
		flag=(Object.keys(data).indexOf(date_key)!=-1)
	});
	$.ajaxSetup({async: true});
	return flag
}