	
	
	//轮播图
	var i = 0;
	var size=3
	$('.num li').first().addClass('on').siblings().removeClass('on');
	//点击切换
	$(".num li").click(function(){
		var width = document.getElementsByClassName("slideshow")[0].offsetWidth
		i = $(this).index();
		$(".slideshow-box").stop().animate({left:-width*i},500);
		$('.num li').eq(i).addClass('on').siblings().removeClass('on');
	})
	//自动播放
	function moveR(){
	var width = document.getElementsByClassName("slideshow")[0].offsetWidth
		i++;
		if(i==size){
		$('.slideshow-box').css({'left':'0px'})
			i=1;
		}
		$('.slideshow-box').stop().animate({left:-width*i},500);
		if(i==size-1){
			$('.num li').eq(0).addClass('on').siblings().removeClass('on');
		}else{
			$('.num li').eq(i).addClass('on').siblings().removeClass('on');
		}
	}
	
	
	var t=setInterval(function(){
		moveR();
	},3000)
	$('.slideshow-box').hover(function(){
		clearInterval(t);
	},function(){
		t=setInterval(function(){
			moveR();
		},3000)
	})


        $.ajax({
			             type: "POST",
			             url: URL + "/home/Notices",
			        	 data:"",
			             dataType: "json",
		                 xhrFields: {
						           withCredentials: true
						       },
						 crossDomain: true,
			             success: function(data){
			             	console.log(data)
			             	var span =""
			             	for(var i=0;i<data.length;i++){
			             		if(data[i].IsNew==1){
			             			span+="<li>"+data[i].Title+"<em>NEW</em></li>"
			             		}else{
			             			span+="<li>"+data[i].Title+"</li>"
			             		}
			             		 
			             	}
			             	$(".news-url").append(span)
			             
			             	var news ="<em>NEW</em>" 
			             	
					$(".news-url li").click(function(){
						var index = $(this).index()
        			 	
        			 	sessionStorage.setItem("index",index)
        			 	window.location.href = "news2.html"
        			 	
        			 	
        			 })


			                      }
        			 });
        			    $.ajax({
	             type: "POST",
	             url:URL +"/User/GetUserInfo",
	             data:{token:token},
	             dataType:"JSON",
	             xhrFields: {
			           withCredentials: true
			       },
			       crossDomain: true,
	             success: function(data){
	             	console.log(data)
	             	if(data.Status==401){
	             					localStorage.removeItem("token")
//	             		
	             		localStorage.removeItem("key")
	             		$(".LoginAjax").hide()
		             	$(".LoginAjax2").show()
	             	}else{
//	             		$(".person2").text(value)
//	             		$(".LoginAjax").show()
//	             		$(".LoginAjax2").hide()
	             	}
	             	
	             		
	             	
	                    }
	       })
        			 
        			 //Json日期转换
							function ConvertJsonDate(jsonDate) {
							    if (jsonDate == null || jsonDate.length == 0) return "";
							    var year = (new Date(parseInt(jsonDate.substr(6)))).getFullYear();
							    var month = (new Date(parseInt(jsonDate.substr(6)))).getMonth() + 1;
							    var day = (new Date(parseInt(jsonDate.substr(6)))).getDate();
							    if (year + "-" + month + "-" + day == "1900-1-1") {
							        return "";
							    }
							    if (month < 10) {
							        month = "0" + month;
							    }
							    if (day < 10) {
							        day = "0" + day;
							    }
							    return year + "-" + month + "-" + day;
							}
							
							function jsonDateFormat(jsonDate) {//json日期格式转换为正常格式
							    if (jsonDate == null || jsonDate.length == 0 || jsonDate == "/Date(-62135596800000)/" || jsonDate == "/Date(-2209017600000)/") return "";
							    try {
							        var date = new Date(parseInt(jsonDate.replace("/Date(", "").replace(")/", ""), 10));
							        var month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
							        var day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
							        var hours = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
							        var minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
							        var seconds = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
//							        return date.getFullYear() + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds;
									return date.getFullYear() + "-" + month + "-" + day + " " + hours + ":" + minutes 
							    } catch (ex) {
							        return "";
							    }
							}
							
							