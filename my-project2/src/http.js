import axios from 'axios'

// axios 配置
axios.defaults.timeout = 5000;
//配置请求的根路径
// 开发api: 'http://192.168.1.116:8080'
// 生产api: 'http://120.77.170.196'
axios.defaults.baseURL = 'http://192.168.1.116:8080';
// http request 请求拦截器
axios.interceptors.request.use(
		config=>{
		//读取登录成功后后台返回的token值
		let data = JSON.parse(sessionStorage.getItem("data"))
		//如果有所有请求头中添加token值
		if (data){
			//此请求头不能随意更改，需和后台沟通
			config.headers.Authorization=data.token;
			config.headers.Username=data.adminName;
		}
    return config;
},error=>{
    // 对请求错误做些什么
    return Promise.reject(error);
});
  //响应拦截器
axios.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        	   switch (error.response.status) {
        	   	//token失效当服务器返回401，路由跳转登录页
                case 401:
                sessionStorage.setItem("isLogin",2);	
				alert("长时间未操作，请刷新后重新登录")
            }
    });
export default axios;