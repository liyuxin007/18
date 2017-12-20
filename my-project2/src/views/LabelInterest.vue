<template>
	<div class="usermanagement">
		<div class="breadcrumb">
			<el-breadcrumb separator="/">
				<el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
				<el-breadcrumb-item>兴趣标签管理</el-breadcrumb-item>
			</el-breadcrumb>
		</div>

		<div class="article">
			<h2>兴趣标签管理</h2>

			<div class="edit">
				<el-form label-width="120px" :model="searchItem" onsubmit="return false;">
					<el-form-item label="标签中心词" >
						<el-input placeholder="请输入标签中心词"  v-model="searchItem.labelid" @keyup.enter.native="searchItemMethod"></el-input>
					</el-form-item>
					<el-form-item >
						<el-button type="primary"  @click="searchItemMethod" >搜索</el-button>
						<el-button type="info" :plain="true" @click="openAddDialogMethod" >添加</el-button>
					</el-form-item>
				</el-form>
			</div>

			<div class="table">
				<el-table border style="width: 100%" height="440" :data="allItems">
					<el-table-column prop="labelid" label="标签ID"></el-table-column>
					<el-table-column prop="labelname" label="标签中心词"></el-table-column>
					<el-table-column prop="labelverb" label="标签动词"></el-table-column>
					<el-table-column prop="labelimagepath" label="标签图标">
						 <template scope="scope">
						        <img style="height: 110px;width: 120px;margin-top: 10px;"   :src="scope.row.labelimagepath" alt="" />
						 </template>
					</el-table-column>
					<el-table-column prop="parentlabelid" label="父级标签id"></el-table-column>
					<el-table-column prop="personality" label="相性"></el-table-column>
					<el-table-column label="编辑" width="300">
						<template scope="scope">
							<el-button type="text" @click="openEditDialogMethod(scope.$index)">查看 &amp; 编辑</el-button>
						<!--	<el-button type="text"  @click="deleteItemMethod(scope.$index)">删除</el-button>-->
						</template>
					</el-table-column>
				</el-table>
			</div>

			<el-dialog title="添加" v-model="isAdd">
				<el-form :model="addItem" enctype="multipart/form-data" id="labelIn">
					<el-form-item label=" 标签ID" :label-width="formLabelWidth" >
						<el-input auto-complete="off" :disabled="true" v-model="addItem.labelid" class="lablewidth"></el-input>
					</el-form-item>
					<el-form-item label="标签中心词" :label-width="formLabelWidth">
						<el-input auto-complete="off" placeholder="string" v-model="addItem.labelname" class="lablewidth" name="labelname"></el-input>
					</el-form-item>
					<el-form-item label="标签动词" :label-width="formLabelWidth">
						<el-input auto-complete="off" placeholder="string" v-model="addItem.labelverb" class="lablewidth" name="labelverb"></el-input>
					</el-form-item>
					
			<el-form-item label="标签图标" :label-width="formLabelWidth" >
		      <el-input auto-complete="off" type="file" name="img"  ></el-input>
		  
		    </el-form-item>
					<el-form-item label="父级标签id" :label-width="formLabelWidth">
						<el-input auto-complete="off" placeholder="long" v-model="addItem.parentlabelid" class="lablewidth" name="parentlabelid"></el-input>
					</el-form-item>
					<el-form-item label="相性 " :label-width="formLabelWidth">
						<el-input auto-complete="off" placeholder="long" v-model="addItem.personality" class="lablewidth" name="personality"></el-input>
					</el-form-item>
				</el-form>
				<div slot="footer" class="dialog-footer">
					<el-button type="primary" @click="addItemMethod">添 加</el-button>
					<el-button @click="closeAddDialogMethod">取 消</el-button>
				</div>
			</el-dialog>

			<el-dialog title="查看 & 编辑" v-model="isEdit">
				<el-form :model="addItem" enctype="multipart/form-data" id="labelChange">
					<el-form-item label=" 标签ID" :label-width="formLabelWidth" >
						<el-input auto-complete="off" :readonly="true" v-model="addItem.labelid" class="lablewidth" name="labelid"></el-input>
					</el-form-item>
					<el-form-item label="标签中心词" :label-width="formLabelWidth">
						<el-input auto-complete="off" placeholder="string" v-model="addItem.labelname" class="lablewidth" name="labelname"></el-input>
					</el-form-item>
					<el-form-item label="标签动词" :label-width="formLabelWidth">
						<el-input auto-complete="off" placeholder="string" v-model="addItem.labelverb" class="lablewidth" name="labelverb"></el-input>
					</el-form-item>
					
			<el-form-item label="标签图标" :label-width="formLabelWidth" >
		      <el-input auto-complete="off" type="file" name="img"  class="lablewidth"></el-input>
		  
		    </el-form-item>
					<el-form-item label="父级标签id" :label-width="formLabelWidth">
						<el-input auto-complete="off" placeholder="long" v-model="addItem.parentlabelid" class="lablewidth" name="parentlabelid"></el-input>
					</el-form-item>
					<el-form-item label="相性 " :label-width="formLabelWidth">
						<el-input auto-complete="off" placeholder="long" v-model="addItem.personality" class="lablewidth" name="personality"></el-input>
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
					labelid: '获取数据中',
					//createtime: '获取数据中',
					labelname: '获取数据中',
					labelverb: '获取数据中',
					labelimagepath: '获取数据中',
					parentlabelid: '获取数据中',
					personality: '获取数据中',
				}],

				formLabelWidth: '120px',
				// add 弹出框 flag，及表单 v-model 初始值
				isAdd: false,
				addItem: {
					labelid: '',
					//createtime: '',
					labelname: '',
					labelverb: '',
					labelimagepath: '',
					parentlabelid: '',
					personality: '',
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
				axios.get('/eyed/web/label/selectAllLabel.action')
				.then((response) => {
					this.allItems = response.data.result;
					console.log(response.data.result)
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
					labelid: '',
					//createtime: '',
					labelname: '',
					labelverb: '',
					labelimagepath: '',
					parentlabelid: '',
					personality: '',
				};
			},
			addItemMethod () {
			 var data = new FormData(document.getElementById("labelIn")); 
	     	 axios({
	     	 	method:'post',
	     	 	url:'/eyed/web/label/addInterest.action',
	     	 	data:data,
	     	 	contentType: false,
	     	 	cache: false,
	     	 }).then((response)=>{
	     	 		if (response.data.code == '0000') {
	     	 			this.getAllItemsMethod()
						console.log(response.data.result)
						
					} else {
						console.log('服务器返回值不为：0000，创建失败');
					};
	     	 })
	     	 	.catch((error) => {
					console.log(error);
				});
			},

			// 项的删除
			deleteItemMethod (index) {
				let deleteItem = this.allItems[index];
				axios.post('/eyed/web/label/deleteLabel.action', qs.stringify({
					labelid: deleteItem.labelid,
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
				this.addItem= index;
				this.addItem = this.clone(this.allItems[index]);
			},
			closeEditDialogMethod () {
				this.isEdit = false;
				// 清空数据
				this.addItem = {
					labelid: '',
					//createtime: '',
					labelname: '',
					labelverb: '',
					labelimagepath: '',
					parentlabelid: '',
					personality: '',
				};
			},
			editItemMethod () {
			 var data = new FormData(document.getElementById("labelChange")); 
	     	 axios({
	     	 	method:'post',
	     	 	url:'/eyed/web/label/updateInterest.action',
	     	 	data:data,
	     	 	contentType: false,
	     	 	cache: false,
	     	 }).then((response)=>{
	     	 		if (response.data.code == '0000') {
	     	 			this.getAllItemsMethod()
						console.log(response.data.result)
						
					} else {
						console.log('服务器返回值不为：0000，创建失败');
					};
	     	 })
	     	 	.catch((error) => {
					console.log(error);
				});
				this.isEdit = false;
				// 清空数据
				this.addItem = {
					labelid: '',
					//createtime: '',
					labelname: '',
					labelverb: '',
					labelimagepath: '',
					parentlabelid: '',
					personality: '',
				};
			},

			// 项的查找
			searchItemMethod () {
				let searchItem = this.searchItem;
				axios.post('/eyed/web/label/selectLabelLikeName.action', qs.stringify({
					likeName:searchItem.labelid,
				}))
				.then((response) => {
					if (response.data.code == '0000') {
						this.allItems = response.data.result;
						console.log(searchItem.labelid);
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
<style>
	.lablewidth input{
		width: 48%!important;
	}
</style>