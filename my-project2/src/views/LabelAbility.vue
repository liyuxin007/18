<template>
	<div class="usermanagement">
		<div class="breadcrumb">
			<el-breadcrumb separator="/">
				<el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
				<el-breadcrumb-item>能力标签管理</el-breadcrumb-item>
			</el-breadcrumb>
		</div>

		<div class="article">
			<h2>能力标签管理</h2>

			<div class="edit">
				<el-form label-width="120px" :model="searchItem" onsubmit="return false;">
					<el-form-item label="标签名称" style="display: inline-block;">
						<el-input placeholder="输入标签名称"  v-model="searchItem.labelid" @keyup.enter.native="searchItemMethod"></el-input>
					</el-form-item>
					<el-form-item style="display: inline-block;">
						<el-button type="primary"  @click="searchItemMethod" >搜索</el-button>
						<el-button type="info" :plain="true" @click="openAddDialogMethod" >添加</el-button>
					</el-form-item>
				</el-form>
			</div>

			<div class="table">
				<el-table border style="width: 100%" height="440" :data="allItems">
					<el-table-column prop="labelid" label="标签名称ID"></el-table-column>
					<el-table-column prop="labelname" label="标签名称"></el-table-column>
					<el-table-column prop="labelimagepath" label="标签图标">
						 <template scope="scope">
						        <img style="height: 110px;width: 120px;margin-top: 10px;"   :src="scope.row.labelimagepath" alt="" />
						 </template>
					</el-table-column>
					<el-table-column prop="labeltype" label="能力分类"></el-table-column>
					<el-table-column prop="createtime" label="创建时间">
							<template scope="scope">
					        <span >{{ scope.row.createtime|discount}}</span>
					    </template>
					</el-table-column>
					<el-table-column label="编辑" width="300">
						<template scope="scope">
							<el-button type="text" @click="openEditDialogMethod(scope.$index)">查看 &amp; 编辑</el-button>
							<!--<el-button type="text"  @click="deleteItemMethod(scope.$index)">删除</el-button>-->
						</template>
					</el-table-column>
				</el-table>
			</div>

			<el-dialog title="添加" v-model="isAdd">
				<el-form :model="addItem" enctype="multipart/form-data" id="labelAb">
					<el-form-item label="labelid" :label-width="formLabelWidth">
						<el-input auto-complete="off" :disabled="true" v-model="addItem.labelid"></el-input>
					</el-form-item>
					<el-form-item label="labelname" :label-width="formLabelWidth">
						<el-input auto-complete="off" placeholder="string" v-model="addItem.labelname" name="labelname"></el-input>
					</el-form-item>
					<el-form-item label="labelimagepath" :label-width="formLabelWidth">
						<el-input auto-complete="off" type="file"  v-model="addItem.img" name="img"></el-input>
					</el-form-item>
					<el-form-item label="labeltype" :label-width="formLabelWidth">
						<el-input auto-complete="off" placeholder="long" v-model="addItem.labeltype" name="labeltype"></el-input>
					</el-form-item>
				</el-form>
				<div slot="footer" class="dialog-footer">
					<el-button type="primary" @click="addItemMethod">添 加</el-button>
					<el-button @click="closeAddDialogMethod">取 消</el-button>
				</div>
			</el-dialog>

			<el-dialog title="查看 & 编辑" v-model="isEdit" >
				<el-form :model="editItem" enctype="multipart/form-data" id="labelAbc">
					<el-form-item label="标签id" :label-width="formLabelWidth">
						<el-input auto-complete="off" :readonly="true" v-model="editItem.labelid" name="labelid"></el-input>
					</el-form-item>
					<el-form-item label="标签名称" :label-width="formLabelWidth">
						<el-input auto-complete="off" placeholder="string" v-model="editItem.labelname" name="labelname"></el-input>
					</el-form-item>
					<el-form-item label="标签图片" :label-width="formLabelWidth">
						<el-input auto-complete="off" type="file" name="img" ></el-input>
					</el-form-item>
					<el-form-item label="labeltype" :label-width="formLabelWidth">
						<el-input auto-complete="off" v-model="editItem.labeltype" name="labeltype"></el-input>
					</el-form-item>
					<!--<el-form-item label="能力标签" :label-width="formLabelWidth" >
							<el-select v-model="editItem.labeltype" >

								<el-option label="" value="技能服务" ></el-option>
							</el-select>
					</el-form-item>-->
					
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
					createTime: '获取数据中',
					labelname: '获取数据中',
					labelimagepath: '获取数据中',
					labeltype: '获取数据中',
					labelverb: '获取数据中',
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
				axios.get('/eyed/web/label/selectAllAbility.action')
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
					labelid: '',
					//createtime: '',
					labelname: '',
					labelimagepath: '',
					labeltype: '',
				};
			},
			addItemMethod () {
				let addItem = this.addItem;
				var data = new FormData(document.getElementById("labelAb")); 
				axios({
	     	 	method:'post',
	     	 	url:'/eyed/web/label/addAbility.action',
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
				axios.post('/eyed/web/tempLabel/deleteTempLabel.action', qs.stringify({
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
				this.editIndex = index;
				this.editItem = this.clone(this.allItems[index]);
			},
			closeEditDialogMethod () {
				this.isEdit = false;
				// 清空数据
				this.editItem = {
					labelid: '',
					//createtime: '',
					labelname: '',
					labelimagepath: '',
					labeltype: '',
				};
			},
			editItemMethod () {
				var data = new FormData(document.getElementById("labelAbc")); 
				axios({
	     	 	method:'post',
	     	 	url:'/eyed/web/label/updateAbility.action',
	     	 	data:data,
	     	 	contentType: false,
	     	 	cache: false,
	     	 }).then((response)=>{
	     	 		if (response.data.code == '0000') {
	     	 			this.getAllItemsMethod()
						
					} else {
						console.log('服务器返回值不为：0000，创建失败');
					};
	     	 })
	     	 	.catch((error) => {
					console.log(error);
				});
				this.isEdit = false;
			},

			// 项的查找
			searchItemMethod () {
				
				let searchItem = this.searchItem;
				axios.post('/eyed/web/label/selectLabelAbilityLikeName.action', qs.stringify({
					likeName:searchItem.labelid
				}))
				.then((response) => {
					if (response.data.code == '0000') {
						this.allItems= response.data.result;
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
