<template>
	<div class="usermanagement">
		<div class="breadcrumb">
		    <el-breadcrumb separator="/" >
		        <el-breadcrumb-item to="/home">首页</el-breadcrumb-item>
		        <el-breadcrumb-item>系统表情管理</el-breadcrumb-item>
		    </el-breadcrumb>
		</div>

		<div class="article">
			<h2>系统表情管理</h2>

			<div class="edit">
				<el-form label-width="120px" :model="searchItem" onsubmit="return false;">
					<el-form-item label="标签ID">
						<el-input placeholder="标签ID"  v-model="searchItem.likeName" @keyup.enter.native="searchItemMethod"></el-input>
					</el-form-item>
					<el-form-item>
						<el-button type="primary"  @click="searchItemMethod">搜索</el-button>
						<el-button type="info" :plain="true" @click="openAddDialogMethod">添加</el-button>
					</el-form-item>
				</el-form>
			</div>

			<div class="table">
				<el-table border style="width: 100%" height="440" :data="allItems">
					<el-table-column prop="emojId" label="表情ID"></el-table-column>
					<el-table-column prop="emojAssort" label="表情包称"></el-table-column>
					<el-table-column prop="emojPath" label="表情路径"></el-table-column>
					<el-table-column prop="emojName" label="表情名称"></el-table-column>
					<el-table-column prop="emojCode" label="表情缩略码"></el-table-column>
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
					<el-form-item label="表情ID" :label-width="formLabelWidth">
						<el-input auto-complete="off" :disabled="true" v-model="addItem.emojId"></el-input>
					</el-form-item>
					<el-form-item label="表情包称" :label-width="formLabelWidth">
						<el-input auto-complete="off" placeholder="string" v-model="addItem.emojAssort"></el-input>
					</el-form-item>
					<el-form-item label="表情路径" :label-width="formLabelWidth">
						<el-input auto-complete="off" placeholder="string" v-model="addItem.emojPath"></el-input>
					</el-form-item>
					
					<el-form-item label="表情名称" :label-width="formLabelWidth">
						<el-input auto-complete="off" placeholder="string" v-model="addItem.emojName"></el-input>
					</el-form-item>
					<el-form-item label="表情缩略码" :label-width="formLabelWidth">
						<el-input auto-complete="off" placeholder="string" v-model="addItem.emojCode"></el-input>
					</el-form-item>
				</el-form>
				<div slot="footer" class="dialog-footer">
					<el-button type="primary" @click="addItemMethod">添 加</el-button>
					<el-button @click="closeAddDialogMethod">取 消</el-button>
				</div>
			</el-dialog>

			<el-dialog title="查看 & 编辑" v-model="isEdit">
				<el-form :model="editItem">
					<el-form-item label="表情ID" :label-width="formLabelWidth">
						<el-input auto-complete="off" :disabled="true" v-model="editItem.emojId"></el-input>
					</el-form-item>
					<el-form-item label="表情包称" :label-width="formLabelWidth">
						<el-input auto-complete="off" placeholder="string" v-model="editItem.emojAssort"></el-input>
					</el-form-item>
					<el-form-item label="表情路径" :label-width="formLabelWidth">
						<el-input auto-complete="off" placeholder="string" v-model="editItem.emojPath"></el-input>
					</el-form-item>
					<el-form-item label="表情名称" :label-width="formLabelWidth">
						<el-input auto-complete="off" placeholder="string" v-model="editItem.emojName"></el-input>
					</el-form-item>
					<el-form-item label="表情缩略码" :label-width="formLabelWidth">
						<el-input auto-complete="off" placeholder="string" v-model="editItem.emojCode"></el-input>
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
					likeName: '',
				},

				// 表格数据
				allItems: [{
					emojId: '获取数据中',
					emojAssort: '获取数据中',
					emojPath: '获取数据中',
					emojName: '获取数据中',
					emojCode: '获取数据中',
				}],

				formLabelWidth: '120px',
				// add 弹出框 flag，及表单 v-model 初始值
				isAdd: false,
				addItem: {
					emojId: '',
					emojAssort: '',
					emojPath: '',
					emojName: '',
					emojCode: '',
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
				axios.get('/eyed/web/selectAllDEMOJ.action')
				.then((response) => {
					this.allItems = response.data.result;
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
					emojId: '',
					emojAssort: '',
					emojPath: '',
					emojName: '',
					emojCode: '',
				};
			},
			addItemMethod () {
				let addItem = this.addItem;
				axios.post('/eyed/web/addDEMOJ.action', qs.stringify({
					emojId: addItem.emojId,
					emojAssort: addItem.emojAssort,
					emojPath: addItem.emojPath,
					emojName: addItem.emojName,
					emojCode: addItem.emojCode,
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
				axios.post( '/eyed/web/deleteDEMOJ.action', qs.stringify({
					demojid: deleteItem.emojId,
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
					emojId: '',
					emojAssort: '',
					emojPath: '',
					emojName: '',
					emojCode: '',
				};
			},
			editItemMethod () {
				let editItem = this.editItem;
				axios.post('/eyed/web/updateDEMOJ.action', qs.stringify({
					emojId: editItem.emojId,
					emojAssort: editItem.emojAssort,
					emojPath: editItem.emojPath,
					emojName: editItem.emojName,
					emojCode: editItem.emojCode,
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
				let searchItem = this.searchItem;
				axios.post('/eyed/web/seletcdDEMOJLikeName.action', qs.stringify({
					likeName:searchItem.likeName,
				}))
				.then((response) => {
					if (response.data.code == '0000') {
						this.allItems= response.data.result;
						console.log(searchItem.likeName)
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
