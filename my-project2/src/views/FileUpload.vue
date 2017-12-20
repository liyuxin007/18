<template>
	<div class="blockdL">
		<div class="breadcrumb">
		    <el-breadcrumb separator="/">
		        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
		        <el-breadcrumb-item>文件管理</el-breadcrumb-item>
		    </el-breadcrumb>
		</div>
		<div class="article">
		
			
		<form action="//192.168.1.170:8080/eyed/web/file/upload.action"  method="post" enctype="multipart/form-data" target="nm_iframe">
				<p>
					<span>上传文件:</span><input type="file" name="file" multiple="multiple">
				</p>
				<p style="padding: 30px 0;">
					<!--<el-button @click="uploadS ">确认上传</el-button>-->
					<span>提交文件:</span><input  type="submit" value="确认提交" />
					<!--<el-button type="submit">确认上传</el-button>-->
				</p>
		</form>
        <iframe name="nm_iframe" style="display:none;"></iframe>    
		
		
		
		
		
		
		<p >
			<!--
            	作者：jack
            	时间：2017-03-30
            	描述：<a>需指定下载app 地址</a>
            -->
			<span>下载文件:</span><a href="http://hzero.oss-cn-shenzhen.aliyuncs.com/file/eyed.docx" ><el-button type="primary">下载文件</el-button></a>

		</p>
	</div>
	</div>
</template>

<script>
	import axios from 'axios'
	import qs from 'qs'
	
	export default {
		data () {
			return {
				// 接口端口地址
				// 开发
//				api: 'http://192.168.1.170:8080',
				// 生产
				api: 'http://120.77.170.196',	
			};
		},
		
		created () {
			// 路由导航完成后，获取 allItems
		},
		
		methods: {
//			uploadS (){
//				axios.post(this.api + '/eyed/web/file/upload.action')
//				.then((response) => {
////					this.allItems = response.data.result;
//					alert("cg");
//					console.log('response.data.result');
//					console.log(response.data.result);
//				})
//				.catch((error) => {
//					console.log(error);
//				});
//			},
		},
	};
</script>
