<template>
	<div class="usermanagement">
		<div class="breadcrumb">
			<el-breadcrumb separator="/">
				<el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
				<el-breadcrumb-item>好友关系管理</el-breadcrumb-item>
			</el-breadcrumb>
		</div>

		<div class="article">
			<h2>好友关系管理</h2>

			<div class="edit">
				<el-form label-width="120px" :model="searchItem" onsubmit="return false;">
					<el-form-item label="主键" style="display: inline-block;">
						<el-input placeholder="输入主键"  v-model="searchItem.frsId" @keyup.enter.native="searchItemMethod"></el-input>
					</el-form-item>
					<el-form-item style="display: inline-block;">
						<el-button type="primary"  @click="searchItemMethod" >搜索</el-button>
					</el-form-item>
				</el-form>
			</div>
			<div class="table">
				<el-table border style="width: 100%" height="440" :data="allItems">
					<el-table-column prop="frsId" label="主键" width="100"></el-table-column>
					<el-table-column prop="notename1" label="用户1对用户2的备注名称"></el-table-column>
					<el-table-column prop="notename2" label="用户2对用户1的备注名称"></el-table-column>
					<el-table-column prop="relationLevel" label="关系级别"></el-table-column>
					<el-table-column prop="userid1" label="用户1ID"></el-table-column>
					<el-table-column prop="userid2" label="用户2ID"></el-table-column>
					<el-table-column label="编辑" width="200">
						<template scope="scope">
							<el-button type="text" >查看 &amp; 编辑</el-button>
						</template>
					</el-table-column>
				</el-table>
			</div>
			<!--分页组件-->
			<div class="block">
			    <el-pagination
			      @current-change="friendsRelationship"
			      :current-page="page"
			      layout="prev, pager, next, jumper"
			      :total="total"
			      >
			    </el-pagination>
			  </div>




		</div>
	</div>
</template>

<script>
	import axios from 'axios'
	import qs from 'qs'

	export default {
		data () {
			return {
				//分页默认
				page:1,
				//分页总数element框架中总数总是除以10去计算
				total:1,
				// 搜索输入框 v-model 初始值
				searchItem: {
					likeName: '',
				},

				// 表格数据
				allItems: [{
					frsId: '获取数据中',
					notename1: '获取数据中',
					notename2: '获取数据中',
					relationLevel: '获取数据中',
					userid1: '获取数据中',
					userid2: '获取数据中',
				}],


			};
		},

		created () {
			// 路由导航完成后，获取 allItems
			this.getAllItemsMethod();
		},

		methods: {
			// 获取 allItems
			getAllItemsMethod () {

				axios.post('/eyed/web/friend/selectFriendShipsForWeb.action',qs.stringify({
					current:1,
					length:3
				}))
				.then((response) => {
					this.allItems = response.data.result.resultList;
					this.total = (this.total = response.data.result.count/3)*10
				})
				.catch((error) => {
					console.log(error);
				});
			},

			friendsRelationship(val){
				//点击分页让当前对象的滚动条返回顶部
				document.getElementsByClassName("el-table__body-wrapper")[0].scrollTop=0;
				let searchItem = this.searchItem;
				this.page=val;
				axios.post('/eyed/web/friend/selectFriendShipsForWeb.action', qs.stringify({
				current:val,
				length:3,
				frsId:searchItem.frsId,
				}))
				.then((response) => {
					this.allItems = response.data.result.resultList;
					console.log(this.allItems)
				})
				.catch((error) => {
					console.log(error);
				});
			},
			
			
			
			// 项的查找
			searchItemMethod () {
				let searchItem = this.searchItem;
				this.page=1;
				axios.post('/eyed/web/friend/selectFriendShipsForWeb.action', qs.stringify({
					frsId:searchItem.frsId,
					current:1,
					length:3
				}))
				.then((response) => {
					if (response.data.code == '0000') {
						this.allItems= response.data.result.resultList;
						this.total = (this.total = response.data.result.count/3)*10
					} else {
						alert(response.data.msg);
						console.log('服务器返回值不为：0000，查询失败！');
					};
				})
				.catch((error) => {
					alert("参数错误")
					console.log(error);
				});

			},
		},
	};
</script>
