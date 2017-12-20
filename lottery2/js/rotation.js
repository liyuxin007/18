//var i2 = 1
var domainUrl="http://apiqa.18guanjia.com";
var stateClass = "download nor", stateTxt = "下载"
var packtype = 'packtype'
var downtype = 'downtype'
var getState, state, stateTxt

var t =''

//$(".foot").addClass("vv")

 //获取状态
   for(var i=0;i<$(".ft3 button").length;i++){
   	var packname1 = $(".ft3 button").eq(i).attr("data-packname")
   	var verCode1 =$(".ft3 button").eq(i).attr("data-vercode")
   	var downloadUrl = $(".ft3 button").eq(i).attr("data-downurl")
   	console.log($(".ft3 button").eq(i))
   	 				try {
						var getState =roid.getState(packname1,verCode1,downloadUrl);
						var state =goo.getStateTxt(getState)
						$(".ft3 button").eq(i).text(state.stateTxt)
						$(".ft3 button").eq(i).removeClass("nor downing open cancel upgrade install retry").addClass(state.stateClass)
					} catch (e) {
						
					}
   }

 
 
 
if(sessionStorage.getItem("i2")){
	$(".math").text(sessionStorage.getItem("i2"))
}
	
	
	if(sessionStorage.getItem("f")){
		var f =sessionStorage.getItem("f")
	}else{
		var f = 0
	}

$('.one').click(function(){
	var num = $('.one').index(this)
	try{
		goo.buildDetailPage($(".ft3 button").eq(num))
	}catch(e){
		
	}
})

$(".ft3 button").click(function(evn){
			
			t=$(".ft3 button").index(this);
			goo.downLoad($(".ft3 button").eq(t))
			var packname1 = $(".ft3 button").eq(t).attr("data-packname")
		   	var verCode1 =$(".ft3 button").eq(t).attr("data-vercode")
		   	var downloadUrl = $(".ft3 button").eq(t).attr("data-downurl")
	  		
	  			try {
								var getState =roid.getState(packname1,verCode1,downloadUrl);
								var state =goo.getStateTxt(getState)
								$(".ft3 button").eq(t).text(state.stateTxt)
								$(".ft3 button").eq(t).removeClass("nor downing open cancel upgrade install retry").addClass(state.stateClass)
							} catch (e) {
								
							}
							
	  		//调用JAVA下载
	  		
						f++
					
						if(f>=5){
						
							sessionStorage.setItem("f",f)
							return
							
						}else{
								if(sessionStorage.getItem("i2")){
									i2 =parseInt(sessionStorage.getItem("i2")) 
						}
							i2 =i2+1
							
						  	if(i2<=5){
						  		sessionStorage.setItem("i2",i2)
						  		
							
						   	$(".math").text(sessionStorage.getItem("i2"))
						   	}else{
						   		
						   	}
						   	
						}
//						$(this).unbind()
						  
				})


var i = 1

var a = 230+1080
function back(){
	if(i>=2){
	 a = a+1080-1
		$('.KinerLotteryContent').css({
            '-webkit-transition': 'all 5s',
            'transition': 'all 5s',
            '-webkit-transform': 'rotate(' + a + 'deg)',
            'transform': 'rotate(' + a + 'deg)'
        });
}
	
if(i==1){
	
		$('.KinerLotteryContent').css({
            '-webkit-transition': 'all 5s',
            'transition': 'all 5s',
            '-webkit-transform': 'rotate(' + a + 'deg)',
            'transform': 'rotate(' + a + 'deg)'
        });
        i++
}
}

var i2 =1
function clic(){
	$(".inner").click(function(){
		
		if(sessionStorage.getItem("i2")){
									i2 =parseInt(sessionStorage.getItem("i2")) 
		}
		
			console.log(i2)
				if(i2<1){
					
				}else{
				back()
				i2=	i2 -1
				sessionStorage.setItem("i2",i2)
				console.log(i2)
					$(".math").text(i2)
					$('.inner').unbind()
					
				    setTimeout(function(){
				    	clic()
				    },5000)
				}
			
				
				})
	
}
				

clic()






