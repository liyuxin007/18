var URL ="http://192.168.1.84:8754"
//var URL ="http://openapiqa.apgoview.com"
//var URL ="http://openapi.apgoview.com"
//兼容箭头的hover
	$(".head-right").mousemove(function(){
		$(".person").css("color","#7DB72F")
		$(".arrow").css("border-top","8px solid #7DB72F");
		$(".hover").css("display","block")
		
	})
	$(".head-right").mouseleave(function(){
		$(".person").css("color","#aaa")
		$(".arrow").css("border-top","8px solid #aaa");
		$(".hover").css("display","none")
	})
//var imgserver = "http://img.30.net"
var imgserver = "http://imgqa.30.net"
//登录
$(".down").click(function(){
	$(".bounces-box").hide()
	$(".prompt2").hide()
	$(".agposition").hide()
	$(".agcolor").hide()
	if(check==false){
		$(" input[ type='password' ] ").val('')
	}
})
var check = false
$(".checkbox input").click(function(){
	
	if(check==false){
		console.log(1)
	
		check = true
	}else{
		
		console.log(2)
		check = false
	}
	
})
$(".head-login").click(function(){
	console.log(1)
	$(".bounces-box").show();
})
$(".bounces-box").css({"height": $(document).height()});
$(".bounces-box2").css({"height": $(document).height()});
//var value = localStorage.getItem("mail");
//			if(value){
//				
//	             		$(".person2").text(value)
//	             		$(".LoginAjax").show()
//	             		$(".LoginAjax2").hide()
//			}
			
$(".login").click(function(){
		$.ajax({
		             type: "POST",
		             url: URL + "/Home/LoginAjax",
		             data:{userName:$(".login-mail").val(),password:$(".login-pw").val()},
		             dataType:"JSON",
		             xhrFields: {
				           withCredentials: true
				       },
				       crossDomain: true,
		             success: function(data){
		             	console.log(data)
		             	if(data.Status==1){
		             		$(".bounces-box").hide()
		             		localStorage.setItem("mail", $(".login-mail").val());
		             		localStorage.setItem("token", data.Message);
		             		if(check==false){
		             			localStorage.removeItem("passWord")
		             				
		             		}else{
		             			localStorage.setItem("passWord",$(".login-pw").val())
		             		}
		             		$(".person2").text($(".login-mail").val())
		             		$(".LoginAjax").show()
		             		$(".LoginAjax2").hide()
		             		$(".prompt2").hide()
		             		window.location.href = "user_center/user.html"
		             	}
						if(data.Message=="账号或密码错误"){
							$(".prompt2").show()
							$(".agcolor").hide()
						}
						if(data.Message=="账号没有激活，请激活后再登录"){
							$(".prompt2").hide()
							$(".agcolor").show()
						}
		                    }
		       });
})

$(".login-mail").val(localStorage.getItem("mail")) 
$(".login-pw").val(localStorage.getItem("passWord"))
//login-pw

//激活
$(".agcolor").click(function(){
				$.ajax({
					             type: "POST",
					             url: URL + "/Register/SendMail",
					             data:{email:$(".login-mail").val()},
					             dataType: "json",
					             xhrFields: {
							           withCredentials: true
							       },
							       crossDomain: true,
					             success: function(data){
					             	var obj = document.getElementsByClassName("agposition")[0]
					             	var fade = new Fade();
									
					             	if(data.Message=="邮件发送成功！请注意查收"){
					             		
					             		$(".agposition").show()
					             			
										 //淡出
					             		$(".agposition").text("邮件发送成功")
					             	}
					             	if(data.Message=="发送频率过大，请稍后再发送"){
					             		$(".agposition").show()
					             			fade.hide(obj)
										
					             		$(".agposition").text("发送频率过大，请稍后再发送")
					             		
					             	}
			
					                    }
					         });
			})


//退出
$(".pull-out").click(function(){
	$.ajax({
		             type: "POST",
		             url: URL + "/Home/LogOut",
		             dataType:"text",
		             xhrFields: {
				           withCredentials: true
				       },
			        crossDomain: true,
	             	success: function(data){
	             		remove()
	             		$(".LoginAjax").hide()
	             		$(".LoginAjax2").show()
						
						
						
						
	                    }
		       });
})


function remove(){
	localStorage.removeItem("token")
//	             		localStorage.removeItem("mail")
	             		localStorage.removeItem("key")
}

$(".pull-out2").click(function(){
	$.ajax({
		             type: "POST",
		             url: URL + "/Home/LogOut",
		             dataType:"text",
		             xhrFields: {
				           withCredentials: true
				       },
			        crossDomain: true,
	             	success: function(data){
	             		remove()
	             		$(".LoginAjax").hide()
	             		$(".LoginAjax2").show()
						window.location.href = "../index.html"
						
						
						
	                    }
		       });
})
console.log(document.body.clientHeight)

var allHeight = document.body.clientHeight
//读取登录状态
var token = localStorage.getItem("token")

$(".application2").click(function(){
	var token = localStorage.getItem("token")
	$.ajax({
	             type: "POST",
	             url: URL+"/User/GetUserInfo",
	             data:{token:token},
	             dataType:"JSON",
	             xhrFields: {
			           withCredentials: true
			       },
			       crossDomain: true,
	             success: function(data){
	             
	             	var value =data.Email
	             	
	             	if(data.Status==401){
	             		
	             		$(".bounces-box").show();
	             		console.log(11)
	             	}else{
	             		window.location.href="user_center/user.html"
	             	}
	             	
	                    }
	       });
							})
$(".application3").click(function(){
	var token = localStorage.getItem("token")
	$.ajax({
	             type: "POST",
	             url: URL+"/User/GetUserInfo",
	             data:{token:token},
	             dataType:"JSON",
	             xhrFields: {
			           withCredentials: true
			       },
			       crossDomain: true,
	             success: function(data){
	             	var value =data.Email
	             	if(data.Status==401){
	             		
	             		$(".bounces-box").show();
	             	}else{
	             		window.location.href="user_center/statememt.html"
	             	}
	             	
	                    }
	       });
							})
if(token){
	$(".person2").text(localStorage.getItem("mail"))
	             		$(".LoginAjax").show()
	             		$(".LoginAjax2").hide()
}else{
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
	             	var value =data.Email
	             	if(data.Status==401){
	             	try{
	             		if(swiTch){
							alert("登录失效请重新登录")
								localStorage.removeItem("token")
//	             		localStorage.removeItem("mail")
	             		localStorage.removeItem("key")
							window.location.href = "../index.html"
						}
	             	}catch(e){
	             		
	             	}	
						
						
	             	}else{
	             		$(".person2").text(value)
	             		$(".LoginAjax").show()
	             		$(".LoginAjax2").hide()
	             	}
	             	
	             		
	             	
	                    }
	       });
}





		$(".changepd").click(function(){
			var token = localStorage.getItem("token")
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
	             	var value =data.Email
	             	if(data.Status==401){
	             		alert("登录失效请重新登录")
	             	}else{
	             		window.location.href ="forgot_3.html"
	             	}
	             	
	             		
	             	
	                    }
	       });
		})

//选项卡切换
$(".app-head span").click(function(){
				$(this).addClass("color2").siblings(".app-head span").removeClass("color2")
			})
				
			$(".app-hover1").click(function(){
				console.log(11)
				$(".box1").hide()
				$(".box2").show()
			})
			$(".app-hover2").click(function(){
				$(".box1").show()
				$(".box2").hide()
			})
			

	$(".down2").click(function(){
				$(".bounces-box2").hide()
				$(".false").hide()
			})


//应用
	$(".app-head span").click(function(){
				$(this).addClass("color2").siblings(".app-head span").removeClass("color2")
			})
				
			$(".app-hover1").click(function(){
				$(".box1").hide()
				$(".box2").show()
			})
			$(".app-hover2").click(function(){
				$(".box1").show()
				$(".box2").hide()
			})
			


var Fadeflag = true;
function Fade() {
	//淡入
	this.show = function(obj) {
		var num = 0;
	    if (Fadeflag) {
	        var st = setInterval(function(){
	            num++;
	            Fadeflag = false;
	            obj.style.opacity = num/10;
	            if (num>=10) {
	                clearInterval(st);
	                Fadeflag = true;
	            }
	        },300);
	    }
	}
	//淡出
	this.hide = function(obj) {
		var num = 10;
	    if (Fadeflag) {
	        var st = setInterval(function(){
	            num--;
	            Fadeflag = false;
	            obj.style.opacity = num/10;
	            if (num<=0) {
	                clearInterval(st);
	                Fadeflag = true;
	            }
	        },300);
	    }
	}
}


