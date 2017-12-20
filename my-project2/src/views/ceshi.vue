<template>
  <div>
<el-form ref="form" :model="form" label-width="100px" id="form_data">
  <el-form-item label="表情包名称">
    <el-input v-model="form.name" style="width: 200px;" name="emojAssort" @blur="filter" onsubmit="return false;" placeholder="只能输入中文和英文字母"></el-input>
  </el-form-item>
  <el-form-item label="图片">
  <!--  <el-input v-model="form.date1" style="width: 200px;" name="multipartFiles" type="file" ></el-input>-->
    <input type="file"   name="multipartFiles" multiple="multiple" />
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="onSubmit">立即创建</el-button>
    <el-button>取消</el-button>
  </el-form-item>
  
</el-form>

<img src="http://192.168.1.116:8080/TestDemo/getYzm.do"  alt="" style="height: 100px;width: 200px;"/>




  </div>
</template>

<script>
	import axios from 'axios'
	import qs from 'qs'
  export default {
    data() {
      return {
        form: {}
      }
    },
    created(){
//  	this.getAllItemsMethod();
			this.aaa()
    },
    methods: {
      onSubmit() {
          	 var data = new FormData(document.getElementById("form_data")); 
	     	 axios({
	     	 	method:'post',
	     	 	url:'/eyed/web/emoji/addDemojBatch.action',
	     	 	data:data,
	     	 	contentType: false,
	     	 	cache: false,
	     	 }).then((response)=>{
	     	 		if (response.data.code == '0000') {
	     	 		
						console.log(response.data.result)
						
					} else {
						console.log('服务器返回值不为：0000，创建失败');
					};
	     	 })
	     	 	.catch((error) => {
					console.log(error);
				});
      },
      //失去焦点触发过滤赋值输入框
      filter(){
//  		this.form.name =this.filterStr(this.form.name)
    		this.checkval(this.form.name)
      },
      //过滤输入框的值
      filterStr(str){    
        var pattern = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？%+_]");    
        var specialStr = "";    
        for(var i=0;i<str.length;i++)    
        {    
             specialStr += str.substr(i, 1).replace(pattern, '');     
        }    
        return specialStr;    
    },
     checkval(t) {
    var re = /^[\u4e00-\u9fa5a-z]+$/gi;//只能输入汉字和英文字母
    if(t){
    	if (re.test(t)) {
        return true;
    } else {
    	alert("含有特殊字符")
        return false;
    }
    }
    
},
      aaa(){
      	axios.post('/TestDemo/getYzm.do',qs.stringify({
				
				}))
				.then((response) => {
					
					document.getElementById("iii").src=response.data
					console.log(document.getElementById("iii").src)
//				console.log(response.data)
				
				})
				.catch((error) => {
					console.log(error);
				});
      }
      
//    getAllItemsMethod(){
//    	axios.post('/eyed/web/emoji/tt.action')
//				.then((response) => {
//
//					console.log(response.data.result)
//					
//				})
//				.catch((error) => {
//					console.log(error);
//				});
//    }
    }
  }
</script>



        				<!--┏┓　　┏┓ 
						　　┏┛┻━━━┛┻┓ 
						　　┃　　　　     ┃ 
						　　┃　　　━　   ┃ 
						　　┃　┳┛　┗┳ ┃ 
						　　┃　　　　　   ┃ 
					 　　　    ┃　　┻　      ┃ 
						 　   ┃　　　　      ┃ 
						　　┗━┓　　　┏━┛ 
						　　　　┃　　　┃
						　　　　┃　　　┃
						　　　　┃　　　┗━━━┓ 
						　　　　┃　　　　　　┣┓ 
						　　　　┃　　　　　　┏┛ 
						　　　　┗┓┓┏━┳┓┏┛ 
						　　　　     ┃┫┫　┃┫┫ 
						　　　　     ┗┻┛　┗┻┛-->