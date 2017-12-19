
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
							window.location.href = "../index.html"
	             	}else{
//	             		$(".person2").text(value)
//	             		$(".LoginAjax").show()
//	             		$(".LoginAjax2").hide()
	             	}
	             	
	             		
	             	
	                    }
	       })
var swiTch = 1

//修改密码
$(".changePass").click(function(){
	if(token){
		window.location.href = "personage.html"
		
	}else{
		window.location.href = "../forgot_1.html"
	}
})

//消息提醒
$.ajax({
	             type: "POST",
	             url:URL +"/Message/GetList",
	             data:{token:token},
	             dataType:"JSON",
	             xhrFields: {
			           withCredentials: true
			       },
			       crossDomain: true,
	             success: function(data){
	             		var number2 = 0
	            		for(var i =0;i<data.List.length;i++){
	            	 	    if(data.List[i].IsRead==0){
								number2++
	            	 	    }
	            	 	    
	            		}
	             	if(number2>0){
	             		var div = "<div class=point>"+number2+"</div>"
	            	 	    	
	            	 	    	$(".navigation").append(div)
	             	}
	             		
	             	
	                    }
	       });



 function length(data){
            	var  s =data
            	if(s){
            		if(data.length>=10){
            		
            		 s=data.substring(0,10)+"...";
            	}
            	}
            	
            	
            	return s
            }
 


function undnll (data){
	if(data==undefined||data==null){
		data = '';
		return data
	}else{
		return data
	}
}
