<template>
	<div class="usermanagement">
		<div class="breadcrumb">
			<el-breadcrumb separator="/">
				<el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
				<el-breadcrumb-item>关注关系管理</el-breadcrumb-item>
			</el-breadcrumb>
		</div>

		<div class="article">
			<h2>关注关系管理</h2>

			<div class="edit">
				<el-form label-width="120px" :model="searchItem" onsubmit="return false;">
					<el-form-item label="用户的id" style="display: inline-block;">
						<el-input placeholder="输入用户的id"  v-model="searchItem.userId" @keyup.enter.native="searchItemMethod"></el-input>
					</el-form-item>
					<el-form-item style="display: inline-block;">
						<el-button type="primary"  @click="searchItemMethod" >搜索</el-button>

					</el-form-item>
				</el-form>
			</div>

			<div class="table">
				<el-table border style="width: 100%" height="440" :data="allItems">
					<el-table-column prop="focusID" label="关注的id" width="100"></el-table-column>
					<el-table-column prop="userID" label="用户的id"></el-table-column>
					<el-table-column prop="focususerID" label="被关注用户的id"></el-table-column>
					<el-table-column prop="focustime" label="关注时间"></el-table-column>
					<el-table-column label="编辑" width="200">
						<template scope="scope">
							<el-button type="text" >查看 &amp; 编辑</el-button>
							<!--<el-button type="text"  >删除</el-button>-->
						</template>
					</el-table-column>
				</el-table>
			</div>
			<!--分页组件-->
			<div class="block">
			    <el-pagination
			   	  @current-change="attentionRelationship"
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
				//分页总数
				total:1,
				// 搜索输入框 v-model 初始值
				searchItem: {
					likeName: '',
				},

				// 表格数据
				allItems: [{
					focusid: '获取数据中',
					userid: '获取数据中',
					focususerid: '获取数据中',
					focustime: '获取数据中',

				}],

				formLabelWidth: '120px',
				// add 弹出框 flag，及表单 v-model 初始值
				isAdd: false,
				addItem: {
					labelid: '',
					//createtime: '',
					labelname: '',
					labelimagepath: '',
					labeltype: '',
				},

				// edit 弹出框 flag，当前编辑项 editIndex，及表单 v-model 初始值
				isEdit: false,
				editIndex: '',
				editItem: {},
				//saveItem: {},
			};
		},

		created () {
			// 路由导航完成后，获取 allItems
			this.getAllItemsMethod();
		},

		methods: {
			// 获取 allItems
			getAllItemsMethod () {
				axios.post('/eyed/web/friend/selectFocusrelationShipForWeb.action',qs.stringify({
					current:1,
					length:3
				}))
				.then((response) => {
					this.allItems = response.data.result.resultList;
					this.total = (response.data.result.count/3)*10
				})
				.catch((error) => {
					console.log(error);
				});
			},
			attentionRelationship(val){
				//点击分页让当前对象的滚动条返回顶部
				document.getElementsByClassName("el-table__body-wrapper")[0].scrollTop=0;
				let searchItem = this.searchItem;
				this.page=val;
				axios.post('/eyed/web/friend/selectFocusrelationShipForWeb.action', qs.stringify({
					current:val,
					length:3,
					likeStr:searchItem.likeName,
				}))
				.then((response) => {
					this.allItems = response.data.result.resultList;
					
				})
				.catch((error) => {
					console.log(error);
				});
			},

			// 项的查找
					searchItemMethod () {
				let searchItem = this.searchItem;
				this.page=1;
				axios.post('/eyed/web/friend/selectFocusrelationShipForWeb.action', qs.stringify({
					userId:searchItem.userId,
					current:1,
					length:3
				}))
				.then((response) => {
					if (response.data.code == '0000') {
						
						this.allItems= response.data.result.resultList;
						this.total = (response.data.result.count/3)*10				
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
