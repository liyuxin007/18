// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
Vue.config.productionTip = false

//import axios from 'axios'
//Vue.prototype.$ajax =axios

import axios from './http'
import qs from 'qs'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
Vue.use(ElementUI)

import VueRouter from 'vue-router'
Vue.use(VueRouter)

import routes from './router'
const router = new VueRouter({
//	mode: 'history',
	routes: routes,
	base:'/dist/'
})
//前端登录拦截
//router.beforeEach((to,from,next)=>{
//	let isLogin =Boolean(sessionStorage.getItem('isLogin'))
//	if(isLogin || to.path === '' || to.path ==='/'){
//		next();
//	}else{
//		next('/');
//	}
//})
router.beforeEach((to,from,next)=>{
	let isLogin =sessionStorage.getItem('isLogin')
	
	if(isLogin==1 || to.path === '' || to.path ==='/'){
		next();
	}else{
		next('/');
	}
})
/* eslint-disable no-new */
import App from './App'
new Vue({
//el: '#app',
//template: '<App/>',
  components: { App },
  router,
//	store,
	render: h => h(App)
}).$mount('#app')
//挂载全局时间过滤器
 Vue.filter(
      'discount' ,function(value){
       var date = new Date(value);
       var  y = date.getFullYear(),
        m = date.getMonth() + 1,
        d = date.getDate(),
        h = date.getHours(),
        i = date.getMinutes(),
        s = date.getSeconds();
        if (m < 10) {m = '0' + m; }
        if (d < 10) {d = '0' + d; }
        if (h) {  h= h; }
        if (i < 10) {i = '0' + i; }
        if (s < 10) {  s = '0' + s; }
        var t = y+'-'+m+'-'+d+' '+h+':'+i+':'+s;
        return t;
})
			        