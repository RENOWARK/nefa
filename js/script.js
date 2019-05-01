

$(window).bind('beforeunload',function(){
	$("input[type='checkbox']").attr("checked", false);
	});
	
$(function () {

	/*下拉選單*/ 
	$("#navi-toggle").click(function () {
		let $active = $(".menudrop").hasClass("menudrop--active")

		if (!$active) {
			$(".menudrop").stop().animate({ "top": "0%" }, 400).addClass("menudrop--active");
			$(".header").css("position", "fixed");
		} else {
			$(".header").css("position", "absolute");
			$(".menudrop").stop().animate({ "top": "-150%" }, 400).removeClass("menudrop--active");
		}
	})

	/* 平捲*/
	$(function(){
		// 點選功能表
		$("a[href^=#]:not([href=#])").click(function(){
			// 取得待顯示內容的位置
			var target = $($(this).attr("href")).offset().top;
			
			// 將座標減70px
			target -= 70;
			
			// 平滑捲動到指定位置
			$("html, body").animate({scrollTop: target}, 500);
	
			return false;
		});
	});

	
});


