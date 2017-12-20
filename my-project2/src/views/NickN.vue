<template>
	<div class="usermanagement">
		<div class="breadcrumb">
		    <el-breadcrumb separator="/">
		        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
		        <el-breadcrumb-item>昵称名词管理</el-breadcrumb-item>
		    </el-breadcrumb>
		</div>

		<div class="article">
			<h2>昵称名词管理</h2>

			<div class="edit">
				<el-form label-width="120px" :model="searchItem" onsubmit="return false;">
					<el-form-item label="昵称名词ID">
						<el-input placeholder="请输入昵称名词ID"  v-model="searchItem.likeName" @keyup.enter.native="searchItemMethod"></el-input>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" @click="searchItemMethod">搜索</el-button>
						<el-button type="info" :plain="true" @click="openAddDialogMethod">添加</el-button>
					</el-form-item>
				</el-form>
			</div>
			<!--渲染列表-->
			<div class="table">
				<el-table border style="width: 100%" height="440" :data="allItems">
					<el-table-column prop="nknId" label="昵称名词ID"></el-table-column>
					<el-table-column prop="nNick" label="昵称名词"></el-table-column>
					<el-table-column label="编辑" width="300">
						<template scope="scope">
							<el-button type="text" @click="openEditDialogMethod(scope.$index)">查看 &amp; 编辑</el-button>
						</template>
					</el-table-column>
				</el-table>
			</div>
			<!--分页组件-->
			  <div class="block">
			    <el-pagination
			      @current-change="nounPaging"
			      :current-page="page"
			      layout="prev, pager, next, jumper"
			      :total="total"
			      >
			    </el-pagination>
			  </div>
				
			<!--添加弹框-->
			<el-dialog title="添加" v-model="isAdd">
				<el-form :model="addItem">
					<el-form-item label="昵称名词ID" :label-width="formLabelWidth">
						<el-input auto-complete="off" :disabled="true" v-model="addItem.nknId"></el-input>
					</el-form-item>
					<el-form-item label="昵称名词" :label-width="formLabelWidth">
						<el-input auto-complete="off" placeholder="string" v-model="addItem.nNick"></el-input>
					</el-form-item>
				</el-form>
				<div slot="footer" class="dialog-footer">
					<el-button type="primary" @click="addItemMethod">添 加</el-button>
					<el-button @click="closeAddDialogMethod">取 消</el-button>
				</div>
			</el-dialog>
			<!--查看弹框-->
			<el-dialog title="查看 & 编辑" v-model="isEdit">
				<el-form :model="editItem">
					<el-form-item label="昵称名词ID" :label-width="formLabelWidth">
						<el-input auto-complete="off" :disabled="true" v-model="editItem.nknId"></el-input>
					</el-form-item>
					<el-form-item label="昵称名词" :label-width="formLabelWidth">
						<el-input auto-complete="off" placeholder="string" v-model="editItem.nNick"></el-input>
					</el-form-item>
				</el-form>
				<div slot="footer" class="dialog-footer">
					<el-button type="primary" @click="editItemMethod">保存</el-button>
					<el-button @click="closeEditDialogMethod">取 消</el-button>
				</div>
			</el-dialog>

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
					likeName:'',
				},

				// 表格数据
				allItems: [{
					nknId: '获取数据中',
					nNick: '获取数据中',
				}],

				formLabelWidth: '120px',
				// add 弹出框 flag，及表单 v-model 初始值
				isAdd: false,
				addItem: {
					nknId: '',
					nNick: '',
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
				axios.post('/eyed/web/nickManager/seletedAllNickN.action', qs.stringify({
					current:1,
				}))
				.then((response) => {
					this.allItems = response.data.result.resultList;
					this.total = response.data.result.count/5
					console.log(this.allItems)
				})
				.catch((error) => {
					console.log(error);
				});
			},
			//分页请求
			nounPaging(val){
				let searchItem = this.searchItem;
				//点击分页让当前对象的滚动条返回顶部
				document.getElementsByClassName("el-table__body-wrapper")[0].scrollTop=0;
				//动态改变分页值，便于搜索返回到第一页
				this.page=val;
				axios.post('/eyed/web/nickManager/seletcdDNickNLikeNick.action', qs.stringify({
					current:val,
					likeStr:searchItem.likeName,
				}))
				.then((response) => {
					this.allItems = response.data.result.resultList;
					
				})
				.catch((error) => {
					console.log(error);
				});
			},


			// 项的添加
			openAddDialogMethod () {
				this.isAdd = true;
			},
			closeAddDialogMethod () {
				this.isAdd = false;
				// 清空数据
				this.addItem = {
					nknId: '',
					nNick: '',
				};
			},
			addItemMethod () {
				let addItem = this.addItem;
				axios.post('/eyed/web/nickManager/addNickN.action', qs.stringify({
					NickN: addItem.nNick,
				}))
				.then((response) => {
					if (response.data.code == '0000') {
						// 添加完成重新获取 allItems
						this.getAllItemsMethod();
						// 流程结束后关闭 dialog
						this.closeAddDialogMethod();
					} else {
						console.log('服务器返回值不为：0000，添加失败');
					};
				})
				.catch((error) => {
					console.log(error);
				});
			},

			// 项的删除
//			deleteItemMethod (index) {
//				let deleteItem = this.allItems[index];
//				axios.post(this.api + '/eyed/web/deleteNickN.action', qs.stringify({
//					NickNID: deleteItem.nknId,
//				}))
//				.then((response) => {
//					if (response.data.code == '0000') {
//						// 根据 index 删除该项
//						this.allItems.splice(index, 1);
//					} else {
//						console.log('服务器返回值不为：0000，删除失败');
//					};
//				})
//				.catch((error) => {
//					console.log(error);
//				});
//			},
//
			// 项的查看 & 编辑
			clone (obj) {
				let newObj = {};
				for (let key in obj) {
					let val = obj[key];
					newObj[key] = typeof val === 'object' ? this.clone(val) : val;
				}
				return newObj;
			},
			openEditDialogMethod (index) {
				this.isEdit = true;
				// 获取当前编辑项 item
				this.editIndex = index;
				this.editItem = this.clone(this.allItems[index]);
			},
			closeEditDialogMethod () {
				this.isEdit = false;
				// 清空数据
				this.editItem = {
					nknId: '',
					nNick: '',
				};
			},
			editItemMethod () {
				let editItem = this.editItem;
				axios.post( '/eyed/web/nickManager/updateNickN.action', qs.stringify({
					NickNID: editItem.nknId,
					NickNNick: editItem.nNick,
				}))
				.then((response) => {
					if (response.data.code == '0000') {
						this.closeEditDialogMethod();
						this.getAllItemsMethod();
					} else {
						console.log('服务器返回值不为：0000，删除失败');
					};
				})
				.catch((error) => {
					console.log(error);
				});
			},

			// 项的查找
			searchItemMethod () {
				document.getElementsByClassName("el-table__body-wrapper")[0].scrollTop=0
				let searchItem = this.searchItem;
				//初始化分页值
				this.page=1;
				axios.post('/eyed/web/nickManager/seletcdDNickNLikeNick.action', qs.stringify({
					likeStr:searchItem.likeName,
					current:1
				}))
				.then((response) => {
					if (response.data.code == '0000') {
						if(response.data.result.count=='0'){
							alert("没有查找到此账号")
						}else{
						this.allItems = response.data.result.resultList
						this.total = response.data.result.count/5
						}
					} else {
						alert("没有查找到此账号");
						console.log('服务器返回值不为：0000，查询失败！');
					};
				})
				.catch((error) => {
					console.log(error);
				});
			},
		},
	};
</script>
