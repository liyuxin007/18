<template>
	<div >
	<div class="header">
			<el-menu default-active="1" class="el-menu-demo header-bar" mode="horizontal"  >		
			<el-menu-item class="logo" index="1" ><router-link to="/">爱的后台管理系统</router-link></el-menu-item>
		<el-submenu class="userBtn" index="2">
			<template slot="title" >admin</template>
			<el-menu-item index="2-1">退出登录</el-menu-item>
		</el-submenu>
	</el-menu>
	</div>
			<div class='sidebar'>
				<el-menu class="el-menu-vertical-demo sidebar-nav" theme="dark" :router="isRouter" :unique-opened="isOpened" default-active="1" @open="handleOpen" @close="handleClose">
		<el-menu-item index="/home/hometow">首页</el-menu-item>
		<el-submenu index="1">
			<template slot="title">爱的号管理</template>
			<el-menu-item index="/home/Eyedcode">爱的号管理</el-menu-item>
			<el-menu-item index="/home/Usercode">用户信息管理</el-menu-item>
		</el-submenu>
		<el-submenu index="2">
			<template slot="title">昵称管理</template>
			<el-menu-item index="/home/NickAdj">昵称形容词管理</el-menu-item>
			<el-menu-item index="/home/NickN">昵称名词管理</el-menu-item>
		</el-submenu>
		<el-submenu index="3">
			<template slot="title">联系人管理</template>
			<el-menu-item index="/home/BlockedList">黑名单</el-menu-item>
			<!--<el-menu-item index="/home/newfriend">好友申请</el-menu-item>-->
			<el-menu-item index="/home/FriendRelationShip">好友关系</el-menu-item>
			<el-menu-item index="/home/FocusrelationShip">关注关系</el-menu-item>
		</el-submenu>
	
		<el-submenu index="4">
			<template slot="title">标签管理</template>
			<el-menu-item index="/home/LabelAbility">能力标签管理</el-menu-item>
			<el-menu-item index="/home/LabelInterest">兴趣标签管理</el-menu-item>
		</el-submenu>
		<el-submenu index="5">
			<template slot="title">表情管理</template>
			<el-menu-item index="/home/SystemFacePack">系统表情包</el-menu-item>
		</el-submenu>
		
		<el-submenu index="6">
			<template slot="title">国家地区管理</template>
			<el-menu-item index="/home/NationalArea">国家区域操作管理</el-menu-item>
		</el-submenu>
		<el-submenu index="7">
			<template slot="title">用户活动管理</template>
			<el-menu-item index="/home/UserActivity">活动管理</el-menu-item>
			<el-menu-item index="/home/CreateActivitie">我的活动创建</el-menu-item>
			
		</el-submenu>
		<el-submenu index="8">
			<template slot="title">发帖标签管理</template>
			<el-menu-item index="/home/PostLabel">发帖标签管理</el-menu-item>
		</el-submenu>
		<el-submenu index="9">
			<template slot="title">文件上传，下载管理</template>
			<el-menu-item index="/home/FileUpload">文件管理</el-menu-item>
		</el-submenu>
		 <el-submenu index="10">
      		<template slot="title">用户反馈</template>
      		<el-menu-item index="/home/ProblemOfFeedback">APP问题反馈</el-menu-item>
      		<el-menu-item index="/home/ProblemUser">用户举报</el-menu-item>
        </el-submenu>
        <el-submenu index="11">
      		<template slot="title">支付管理</template>
      		<el-menu-item index="/home/TradingRecord">查询支付流水</el-menu-item>
      		<el-menu-item index="/home/TransactionType">交易类型管理</el-menu-item>
      		<el-menu-item index="/home/CeShi">测试</el-menu-item>
        </el-submenu>
        	
	</el-menu>
			</div>
			<div class="mainbody">
				<router-view></router-view>
			</div>
	</div>
</template>

<script>
	export default {
		data () {
			return {
				// 开启导航路由
				isRouter: true,
				// 只保持一个子菜单的展开
				isOpened: true,
				
			}
		},
		methods: {
			handleOpen (key, keyPath) {
				console.log(key, keyPath);	
			},
			handleClose (key, keyPath) {
				console.log(key, keyPath);
			}
		}
	}
</script>
<style >
		.logo a{
			text-decoration: none;
		}
		.header-bar {
			background: #E5E9F2;
			}
		.logo {
			font-size: 18px;
			}
		.userBtn {
			float: right !important;
			}
		.header {
			position: fixed;
			top: 0;
			left: 0;
			width: 100%;
			z-index: 1000;
			}
		.sidebar {
			position: fixed;
			top: 60px;
			left: 0;
			width: 240px;
			height: 100%;
			background: #324057;
			overflow-y: auto;
			}
				.mainbody {
		width: 100%;
		height: 100%;
		padding: 60px 0 0 240px;
			}
		
		.breadcrumb {
			height: 60px;
			padding: 24px;
			background: #F9FAFC;
			}
		.cell{
			text-align: center;
			}
		.disa{
			display: inline-block;
			}
		.article {
			padding: 24px;
			
			}
		.article  .edit {
				width: 400px;
				padding-top: 20px;
				
				}
		.article  .edit	.el-select {
					width: 100%;
				}
</style>
