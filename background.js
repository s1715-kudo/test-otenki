$(window).scroll(function () {
	if($(".data_area").height()+$(".data_area").offset().top>$(this).height()+$(this).scrollTop()){
		$("#area").css("top",$(this).scrollTop());
	}
});
