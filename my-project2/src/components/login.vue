<template>
  <div id="app">
    <div class="login-title">登录爱的后台系统</div>
    	<div class="login-block">
				<el-form class="demo-ruleForm" ref="ruleForm" label-width="60px" :model="ruleForm" :rules="rules">
					<el-form-item label="用户名" prop="user">
						<el-input type="text" auto-complete="off" v-model="ruleForm.user" ></el-input>
					</el-form-item>
					<el-form-item label="密码" prop="pass">
						<el-input type="password" auto-complete="off" v-model="ruleForm.pass"></el-input>
					</el-form-item>
					<el-form-item>
						<el-button class="login-button" type="primary"  @click="submitForm(ruleForm)">登录</el-button>
						<el-button @click="resetForm(ruleForm)">重置</el-button>
					</el-form-item>
				</el-form>
			</div>
  </div>
</template>
<script>
		import axios from 'axios'
		import qs from 'qs'
		export default {
	  data() {
	  		let checkUser = (rule, value, callback) => {
					if(!value) {
						return callback(new Error('请输入用户名'));
					}
				};
				let validatePass = (rule, value, callback) => {
					if(!value) {
						callback(new Error('请输入密码'));
					}
				};
  	return {
 
		 		ruleForm: {
		 			//默认初始值
							user: 'admin',
							pass: 'eyed2017',
						},
						rules: {
					user: [{
						validator: checkUser,
						trigger: 'blur'
					}],
					pass: [{
						validator: validatePass,
						trigger: 'blur'
					}],
				}
  	}
		  },
		 
		  methods:{
		  		submitForm(formName) {
		  			//创建Base64对象对密码加密
		  			var  Base64={_keyStr:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
									encode:function(e){var t="";var n,r,i,s,o,u,a;var f=0;e=Base64._utf8_encode(e);while(f<e.length)
									{n=e.charCodeAt(f++);r=e.charCodeAt(f++);i=e.charCodeAt(f++);s=n>>2;o=(n&3)<<4|r>>4;u=(r&15)<<2|i>>6;a=i&63;if(isNaN(r)){u=a=64}
									else if(isNaN(i)){a=64}t=t+this._keyStr.charAt(s)+this._keyStr.charAt(o)+this._keyStr.charAt(u)+this._keyStr.charAt(a)}return t},
									decode:function(e){var t="";var n,r,i;var s,o,u,a;var f=0;e=e.replace(/[^A-Za-z0-9+/=]/g,"");while(f<e.length){s=this._keyStr.indexOf(e.charAt(f++));
									o=this._keyStr.indexOf(e.charAt(f++));u=this._keyStr.indexOf(e.charAt(f++));a=this._keyStr.indexOf(e.charAt(f++));
									n=s<<2|o>>4;r=(o&15)<<4|u>>2;i=(u&3)<<6|a;t=t+String.fromCharCode(n);if(u!=64){t=t+String.fromCharCode(r)}if(a!=64)
									{t=t+String.fromCharCode(i)}}t=Base64._utf8_decode(t);return t},_utf8_encode:function(e){e=e.replace(/rn/g,"n");
									var t="";for(var n=0;n<e.length;n++){var r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r)}else if(r>127&&r<2048)
									{t+=String.fromCharCode(r>>6|192);t+=String.fromCharCode(r&63|128)}else{t+=String.fromCharCode(r>>12|224);t+=String.fromCharCode(r>>6&63|128);
									t+=String.fromCharCode(r&63|128)}}return t},_utf8_decode:function(e){var t="";var n=0;var r=c1=c2=0;while(n<e.length){r=e.charCodeAt(n);
									if(r<128){t+=String.fromCharCode(r);n++}else if(r>191&&r<224){c2=e.charCodeAt(n+1);t+=String.fromCharCode((r&31)<<6|c2&63);n+=2}else
									{c2=e.charCodeAt(n+1);c3=e.charCodeAt(n+2);t+=String.fromCharCode((r&15)<<12|(c2&63)<<6|c3&63);n+=3}}return t}}
						axios.post( '/eyed/web/login.action', qs.stringify({
							adminName: formName.user,
							password:  Base64.encode(formName.pass ),
						}))
						.then((response) => {
							if (response.data.code == '0000') {
								//前端登录拦截
								sessionStorage.setItem("isLogin",1);
								//储存token值
								sessionStorage.setItem("data", JSON.stringify(response.data.result)); 
								//登录成功跳转路由
								this.$router.push('home');
							} else {
									alert('登录失败！');
								console.log('服务器返回值不为：0000，添加失败');
							};
						})
						.catch((error) => {
							console.log(error);
							alert("服务器未开启")
						});
					},
		  	//重置
		  	resetForm() {
					this.ruleForm= {
									user: '',
									pass: '',
							};
					},
		  },

		}
		</script>

<style>
* {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
	}
	
	html {
		font-family: "microsoft yahei";
	}
	.login-title {
		margin-top: 200px;
		font-size: 30px;
		text-align: center;
	}
	.login-block {
		position: absolute;
		top: calc(50% - 150px);
		left: calc(50% - 250px);
		width: 500px;
		height: 300px;
		padding: 40px;
		padding-top: 70px;
		background: #fff;
		box-shadow: 0 0 2px #000;
	}
	.login-button {
		margin-left: 80px;
	}
	
</style>
