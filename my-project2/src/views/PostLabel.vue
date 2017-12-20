<template>
	<div class="blockdL">
		<div class="breadcrumb">
		    <el-breadcrumb separator="/">
		        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
		        <el-breadcrumb-item>发帖标签管理</el-breadcrumb-item>
		    </el-breadcrumb>
		</div>

		<div class="article">
			<h2>发帖标签管理</h2>

			<div class="edit">
				<el-form label-width="120px" :model="searchItem" onsubmit="return false;">
					<el-form-item label="发帖标签名">
						<el-input placeholder="输入发帖标签名"  v-model="searchItem.postlabelname" @keyup.enter.native="searchItemMethod"></el-input>
					</el-form-item>

					<el-form-item>
						<el-button type="primary"  @click="searchItemMethod">搜索</el-button>
						<el-button type="info" :plain="true" @click="openAddDialogMethod">添加</el-button>
					</el-form-item>
				</el-form>
			</div>

			<div class="table">
				<el-table border style="width: 100%" height="440" :data="allItems">
					<el-table-column prop="postlabelid" label="主键"></el-table-column>
					<el-table-column prop="postlabelname" label="发帖标签名"></el-table-column>
					<el-table-column prop="sort" label="排序"></el-table-column>
					<el-table-column label="编辑" width="300">
						<template scope="scope">
							<el-button type="text" @click="openEditDialogMethod(scope.$index)">查看 &amp; 编辑</el-button>
							<!--<el-button type="text"  @click="deleteItemMethod(scope.$index)">删除</el-button>-->
						</template>
					</el-table-column>
				</el-table>
			</div>

			<el-dialog title="添加" v-model="isAdd">
				<el-form :model="addItem">
					<el-form-item label="发帖标签名" :label-width="formLabelWidth">
						<el-input auto-complete="off" 	 v-model="addItem.postlabelname"></el-input>
					</el-form-item>
					<el-form-item label="排序" :label-width="formLabelWidth">
						<el-input auto-complete="off" placeholder="long" v-model="addItem.sort"></el-input>
					</el-form-item>
				</el-form>
				<div slot="footer" class="dialog-footer">
					<el-button type="primary" @click="addItemMethod">添 加</el-button>
					<el-button @click="closeAddDialogMethod">取 消</el-button>
				</div>
			</el-dialog>

			<el-dialog title="查看 & 编辑" v-model="isEdit">
				<el-form :model="editItem">
					<el-form-item label="主键" :label-width="formLabelWidth">
						<el-input auto-complete="off" :disabled="true" v-model="editItem.postlabelid"></el-input>
					</el-form-item>
					<el-form-item label="发帖标签名" :label-width="formLabelWidth">
						<el-input auto-complete="off" placeholder="发帖标签名" v-model="editItem.postlabelname"></el-input>
					</el-form-item>
					<el-form-item label="排序" :label-width="formLabelWidth">
						<el-input auto-complete="off" placeholder="排序" v-model="editItem.sort"></el-input>
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
				// 搜索输入框 v-model 初始值
				searchItem: {
					postlabelname: '',
				},

				// 表格数据
				allItems: [{
					postlabelid: '获取数据中',
					postlabelname: '获取数据中',
					sort: '获取数据中',
				}],

				formLabelWidth: '120px',
				// add 弹出框 flag，及表单 v-model 初始值
				isAdd: false,
				addItem: {
					postlabelname: '',
					sort: '',

				},

				// edit 弹出框 flag，当前编辑项 editIndex，及表单 v-model 初始值
				isEdit: false,
				editIndex: '',
				editItem: {
//					postlabelname: '',
//					sort: '',
				},
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
				axios.get('/eyed/web/postLabel/selectPostLabel.action')
				.then((response) => {
					this.allItems = response.data.result;
					console.log(response.data.result);
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
					postlabelname: '',
					sort: '',
				};
			},
			//增加数据
			addItemMethod () {
				let addItem = this.addItem;
				axios.post('/eyed/web/postLabel/addPostLabel.action', qs.stringify({
					postlabelname: addItem.postlabelname,
					sort: addItem.sort,
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
			deleteItemMethod (index) {
				let deleteItem = this.allItems[index];
				axios.post('/eyed/web/postLabel/deletePostLabel.action', qs.stringify({
					postlabelid: deleteItem.postlabelid,
				}))
				.then((response) => {
					if (response.data.code == '0000') {
						// 根据 index 删除该项
						this.allItems.splice(index, 1);
					} else {
						console.log('服务器返回值不为：0000，删除失败');
					};
				})
				.catch((error) => {
					console.log(error);
				});
			},

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
					postlabelid:'',
					postlabelname: '',
					sort: '',
				};
			},
			//修改数据
			editItemMethod () {
				let editItem = this.editItem;
				axios.post('/eyed/web/postLabel/updatePostLabel.action', qs.stringify({
					postlabelname:editItem.postlabelname,
					sort: editItem.sort,
					postlabelid:editItem.postlabelid,

				}))
				.then((response) => {
					if (response.data.code == '0000') {
						this.closeEditDialogMethod();
						this.getAllItemsMethod();

					} else {
						console.log('服务器返回值不为：0000，修改失败！');
					};
				})
				.catch((error) => {
					console.log(error);
				});
			},

			// 项的查找
			searchItemMethod () {
				let searchItem = this.searchItem;
				axios.post('/eyed/web/postLabel/selectPostLabel.action', qs.stringify({
					postlabelid:searchItem.postlabelname,
				}))
				.then((response) => {
					if (response.data.code == '0000') {
						this.allItems= response.data.result;
						console.log(this.allItems)
					} else {
						alert(response.data.msg);
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
