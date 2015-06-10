(function(){
	var pan = new Hammer(document.getElementById("app"));
	var panEnd = new Hammer(document.getElementById("app")) ;

	pan.on("pan",function(e){
		if(e.deltaX < 0){
			return;
		}
		if(status > 1){
			$(".category").css("left",(320-status*320)+e.deltaX+"px");
			$(".task").css("left",(640-status*320)+e.deltaX+"px");
			$(".content").css("left",(960-status*320)+e.deltaX+"px");
		}
	});
	
	panEnd.on("panend",function(e){
		endTime = new Date().getTime();
		if(e.deltaX > 50 && status==2){
			status = 1;
			$(".category").animate({"left": "0"}, 500);
			$(".task").animate({"left": "320px"}, 500);
			$(".content").animate({"left":"640px"}, 500);
			$(".back").css("display","none");
		}
		if(e.deltaX > 50 && status==3){
			status = 2;
			$(".category").animate({"left": "-320"}, 500);
			$(".task").animate({"left": "0px"}, 500);
			$(".content").animate({"left":"320px"}, 500);
		}
		if(e.deltaX <= 50){
			$(".category").animate({"left": 320*(1-status) + "px"}, 500);
			$(".task").animate({"left": 320*(2-status) + "px"}, 500);
			$(".content").animate({"left":320*(3-status) + "px"}, 500);
		}
	});
})()
