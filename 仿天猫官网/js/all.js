window.onload = function () {
	var oMeau = document.getElementsByClassName("menu_nav");
	var aItem = oMeau[0].getElementsByTagName("li");
	var aPannel = document.getElementsByClassName("pannel_display");
	
	function showPannel(pan,item){
		item.onmouseover = function () {
			pan.style.display = "block";
			item.style.backgroundColor = "#FFFFFF";
			item.style.color = "red";
		}
	}
	function hidePannel(pan,item){
		item.onmouseout = function () {
			pan.style.display = "none";
			item.style.backgroundColor = "rgba(0,0,0,.55)"
			item.style.color = "#FFFFFF";
		}
	}
	for(var i = 0;i < 16;i++){
		showPannel(aPannel[i],aItem[i]);
		hidePannel(aPannel[i],aItem[i]);
	}
	
	//brandWall
	
	var aBrand =document.getElementsByClassName("brand_list");
	var aBrandLi = aBrand[0].getElementsByTagName("li");
	var aBrandImg = aBrand[0].getElementsByTagName("img");
	
	
	for(var i = 0;i < 30;i++){
		aBrandLi[i].index = i;//绑定到dom节点,用this.index获取到当前节点下标
		
		aBrandLi[i].onmouseover = function () {
			this.style.backgroundColor = "black";
			this.style.opacity = "0.5";
			aBrandImg[this.index].style.opacity = "0.3";
		}
		aBrandLi[i].onmouseout = function () {
			this.style.backgroundColor = "#FFFFFF";
			this.style.opacity = "1";
			aBrandImg[this.index].style.opacity = "1";
		}
	}
	
	//mark
	
	var aTwoGird = document.getElementsByClassName("mark_twogrid");
	var aMarkLi = aTwoGird[0].getElementsByTagName("li");
	var aTwogirdCon = aTwoGird[0].getElementsByClassName("twogird_con");
	
		//mark_auto
	var timer = null;
	var count = 0;
	function mark_auto(){
		if(count % 2 == 0){
			aMarkLi[0].style.backgroundColor = "#00b262";	
			aTwogirdCon[0].style.display = "block";
			aMarkLi[1].style.backgroundColor = "#F1F1F1";	
			aTwogirdCon[1].style.display = "none";
		}else{
			aMarkLi[1].style.backgroundColor = "#00b262";	
			aTwogirdCon[1].style.display = "block";
			aMarkLi[0].style.backgroundColor = "#F1F1F1";	
			aTwogirdCon[0].style.display = "none";
		}
		count++;

	}
	timer = setInterval(mark_auto,3000);
	
	for(var i = 0;i < 2;i++){
		aMarkLi[i].index = i;

		aMarkLi[i].onmouseover = function () {
			clearInterval(timer);
			
			this.style.backgroundColor = "#00b262";	
			aTwogirdCon[this.index].style.display = "block";
			if(this.index == 1){
				aTwogirdCon[this.index-1].style.display = "none";
				aMarkLi[this.index-1].style.backgroundColor = "#F1F1F1";
			}else{
				aTwogirdCon[this.index+1].style.display = "none";
				aMarkLi[this.index+1].style.backgroundColor = "#F1F1F1";
			}
		}
		aMarkLi[i].onmouseout = function () {
			timer = setInterval(mark_auto,3000);
		}
	}
	
	//吸顶导航
		
	var oTop = document.getElementById("topshow");
	var topTimer = null;
	var isMoving = false;
	
	var oLeft = document.getElementById("navshow");
		
	window.onscroll = function(){
		var srollTop = document.documentElement.scrollTop || document.body.scrollTop;
//		console.log(srollTop);
		
		if(srollTop > 190){
			//显示
			if(isMoving){
				return 0;
			}
			
			isMoving = true;
		
			topTimer =setInterval(function(){
			
				if(oTop.offsetTop == 0){
					clearInterval(topTimer);
					isMoving = false;
				}else{		
					oTop.style.top = oTop.offsetTop + 5 + "px";
				}
			},30);
		}else{
			//隐藏
			if(isMoving){
				return 0;
			}
			
			isMoving = true;
		
			topTimer =setInterval(function(){
			
				if(oTop.offsetTop == -60){
					clearInterval(topTimer);
					isMoving = false;
				}else{		
					oTop.style.top = oTop.offsetTop - 5 + "px";
				}
			},30);
		}
		
		//左边导航栏
		if(srollTop > 190){
			oLeft.style.display = "block";
		}else{
			oLeft.style.display = "none";
		}	
		
	}
	
	var aLeftNav = document.getElementsByClassName("navshow_item");
	var leftTimer = null;
	
	var aSroll = [1740,2435,3105,3775,4775,5145,5840,6535,0];
	for(var i = 0;i < 9;i++){
		aLeftNav[i].index = i;
			
		aLeftNav[i].onclick = function(){
			srollTopCurrent = aSroll[this.index];
			for(var j = 0;j < 9;j++){
				aLeftNav[j].style.backgroundColor = "rgba(0,0,0,.6)";
			}
			this.style.backgroundColor = "#64c333";
			
			leftTimer = setInterval(function(){
				var srollTopNow = document.documentElement.scrollTop || document.body.scrollTop;
				
				if(srollTopNow == srollTopCurrent){
					clearInterval(leftTimer);
				}else{	
					count = (srollTopCurrent - srollTopNow)/10;
					count = count > 0?Math.ceil(count):Math.floor(count); 
					document.documentElement.scrollTop = document.body.scrollTop =  srollTopNow + count;				
				}
			},10);
		}
	}
	
//结束	
}
