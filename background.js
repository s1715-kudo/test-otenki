$(window).scroll(function () {
	if($(".site_fooder").height()+$(".site_fooder").offset().top>$(this).height()+$(this).scrollTop()){
		$("#area").css("top",$(this).scrollTop());
	}
});
