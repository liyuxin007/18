<template>
	<div class="nationalArea">
		<div class="breadcrumb">
		    <el-breadcrumb separator="/">
		        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
		        <el-breadcrumb-item>国家区域管理</el-breadcrumb-item>
		    </el-breadcrumb>
		</div>

		<div class="article" >
			<h2>国家区域操作管理</h2>
			<div class="edit disa" >
						<el-form label-width="120px" :model="searchItem" onsubmit="return false;">
							<el-form-item label="查询地区操作" >
								<el-input placeholder="国，省，市，县地区名称查询"  v-model="searchItem.name"  @keyup.enter.native="searchItemMethod"></el-input>
							</el-form-item>
							<el-form-item >
								<el-button type="primary"  @click="searchItemMethod" >搜索</el-button>
								<el-button type="primary" :plain="true" @click="openAddDialogMethod">添加</el-button>
							</el-form-item>
						</el-form>
			</div>

			<div class="table">
				<el-table border style="width: 100%" height="440" :data="allItems">
					<el-table-column prop="countryId" label="国家ID"></el-table-column>
					<el-table-column prop="countryName" label="国家名称"></el-table-column>
					<el-table-column prop="proviceId" label="省ID"></el-table-column>
					<el-table-column prop="proviceName" label="省名称"></el-table-column>
					<el-table-column prop="cityId" label="市ID"></el-table-column>
					<el-table-column prop="cityName" label="市名称"></el-table-column>
					<el-table-column prop="countyId" label="(县)区ID"></el-table-column>
					<el-table-column prop="countyName" label="(县)区名称"></el-table-column>
					<el-table-column label="编辑" width="300">
						<template scope="scope">

							<el-button type="text" @click="openEditDialogMethod(scope.$index)">查看 &amp; 修改</el-button>
							<el-button type="text"  @click="deleteItemMethod(scope.$index)">删除</el-button>
						</template>
					</el-table-column>
				</el-table>
			</div>
			<!--分页组件-->
			  <div class="block">
			    <el-pagination
			      @current-change="nationalArea"
			      :current-page="page"
			      layout="prev, pager, next, jumper"
			      :total="total"
			      >
			    </el-pagination>
			  </div>
			<el-dialog title="添加" v-model="isAdd">
				<el-form :model="addItem">
					<el-form-item label="增加区域名称" :label-width="formLabelWidth">
						<el-input auto-complete="off"  placeholder="输入区域名称" v-model="addItem.name"></el-input>
					</el-form-item>
					<el-form-item label="增加区域ID（默认添加国家）" :label-width="formLabelWidth">
						<el-input auto-complete="off" placeholder="输入区域ID" v-model="addItem.pid"></el-input>
					</el-form-item>
				</el-form>
				<div slot="footer" class="dialog-footer">
					<el-button type="primary" @click="addItemMethod">添 加</el-button>
					<el-button @click="closeAddDialogMethod">取 消</el-button>
				</div>
			</el-dialog>

			<el-dialog title="查看 & 编辑" v-model="isEdit">
				<el-form :model="editItem">
					<el-form-item label="国家ID" :label-width="formLabelWidth">
						<el-input auto-complete="off" :disabled="true" placeholder="string" v-model="editItem.countryId"></el-input>
					</el-form-item>
					<el-form-item label="国家名称" :label-width="formLabelWidth">
						<el-input auto-complete="off" placeholder="string" v-model="editItem.countryName"></el-input>
					</el-form-item>
					<el-form-item label="省ID" :label-width="formLabelWidth">
						<el-input auto-complete="off" :disabled="true" placeholder="string" v-model="editItem.proviceId"></el-input>
					</el-form-item>
					<el-form-item label="省名称" :label-width="formLabelWidth">
						<el-input auto-complete="off" placeholder="string" v-model="editItem.proviceName"></el-input>
					</el-form-item>
					<el-form-item label="市ID" :label-width="formLabelWidth">
						<el-input auto-complete="off" :disabled="true" placeholder="string" v-model="editItem.cityId"></el-input>
					</el-form-item>
					<el-form-item label="市名称" :label-width="formLabelWidth">
						<el-input auto-complete="off" placeholder="string" v-model="editItem.cityName"></el-input>
					</el-form-item>
					<el-form-item label="(县)区ID" :label-width="formLabelWidth">
						<el-input auto-complete="off" :disabled="true" placeholder="string" v-model="editItem.countyId"></el-input>
					</el-form-item>
					<el-form-item label="(县)区名称" :label-width="formLabelWidth">
						<el-input auto-complete="off" placeholder="string" v-model="editItem.countyName"></el-input>
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
//	import { regionDataPlus } from 'element-china-area-data'
	export default {
		data () {
			return {
				//分页默认
				page:1,
				//分页总数
				total:1,
				// 搜索输入框 v-model 初始值
				searchItem: {
					name:'',
				},

				// 表格数据
				allItems: [{
					countryId: '获取数据中',
					countryName: '获取数据中',
					proviceId: '获取数据中',
					proviceName: '获取数据中',
					cityId:'获取数据中',
					cityName: '获取数据中',
					countyId: '获取数据中',
					countyName: '获取数据中',
				}],

				formLabelWidth: '120px',
				// add 弹出框 flag，及表单 v-model 初始值
				isAdd: false,
				addItem: {
					name: '',
					pid: '',

				},

				// edit 弹出框 flag，当前编辑项 editIndex，及表单 v-model 初始值
				isEdit: false,
				editIndex: '',
				editItem: {
					countryId: '获取数据中',
					countryName: '获取数据中',
					proviceId: '获取数据中',
					proviceName: '获取数据中',
					cityId:'获取数据中',
					cityName: '获取数据中',
					countyId: '获取数据中',
					countyName: '获取数据中',
				},
				//saveItem: {},
			};
		},

		created () {
			// 路由导航完成后，获取 allItems
			this.getAllItemsMethod();
//			this.searchItemMethod();
		},

		methods: {
			// 获取 allItems
			getAllItemsMethod () {
				axios.post('/eyed/web/region/selectAreaRegion.action',qs.stringify({
					current:1
				}))
				.then((response) => {
					this.allItems = response.data.result.resultList;
					this.total = response.data.result.count/5
				})
				.catch((error) => {
					console.log(error);
				});
			},
			//分页切换
			nationalArea(val){
				//点击分页让当前对象的滚动条返回顶部
				document.getElementsByClassName("el-table__body-wrapper")[0].scrollTop=0
				this.page=val;
				let searchItem = this.searchItem;
				axios.post('/eyed/web/region/selectAreaRegion.action', qs.stringify({
					current:val,
					name:searchItem.name,
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
					name: '',
					pid: '',
				};
			},
     
			//增加数据
			addItemMethod () {
				this.isAdd = false;
				let addItem = this.addItem;
				axios.post('/eyed/web/region/addRegion.action', qs.stringify({
					name: addItem.name,
					pid: addItem.pid,
				}))
				.then((response) => {
					if (response.data.code == '0000') {
						// 添加完成重新获取 allItems
						this.getAllItemsMethod();
						// 流程结束后关闭 dialog
						this.closeAddDialogMethod;

						this.searchItemMethod ();
					} else {
						alert(response.data.msg);
						console.log('服务器返回值不为：0000，添加失败！');
					};
				})
				.catch((error) => {

					console.log(error);
				});
			},

			// 项的删除
			deleteItemMethod (index) {

			let deleteItem = this.allItems[index];
			let deleteId = null;
			//条件判断
			if( deleteItem.countyId){
			    deleteId=deleteItem.countyId;
		        }else if( deleteItem.cityId){
		          deleteId=deleteItem.cityId;
		        }else if(deleteItem.proviceId){
		          deleteId=deleteItem.proviceId;
		        }else{
		          deleteId=deleteItem.countryId;
		        }

			//删除键弹框
          this.$confirm('此操作将删除该区域, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
          }).then(() => {
          	//确定执行
         
          	axios.post( '/eyed/web/region/deleteRegion.action', qs.stringify({
					id:deleteId ,
				}))
				.then((response) => {
					if (response.data.code == '0000') {
					    console.log(deleteId)
						// 根据 index 删除该项
//						alert("删除成功！");
						this.allItems.splice(index, 1);
					} else {
						console.log('服务器返回值不为：0000，删除失败');
					};
				})
				.catch((error) => {
					console.log(error);
				});

        }).catch(() => {

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
					countryCode: '',
					countryName: '',
					countryNational: '',
					sort: '',
				};
			},
			//修改
			editItemMethod () {
				let editItem = this.editItem;
				axios.post('/eyed/web/region/updateAreaRegion.action', qs.stringify({
					countryId:editItem.countryId,
					countryName:editItem.countryName,
					proviceId: editItem.proviceId,
					proviceName:editItem.proviceName,
					cityId:editItem.cityId,
					cityName: editItem.cityName,
					countyId: editItem.countyId,
					countyName:editItem.countyName ,
				}))
				.then((response) => {
					if (response.data.code == '0000') {
						this.closeEditDialogMethod();
//						this.getAllItemsMethod();
						this.searchItemMethod ();
						alert("修改成功！");
					} else {
						console.log('服务器返回值不为：0000，编辑失败！');
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
				axios.post('/eyed/web/region/selectAreaRegion.action', qs.stringify({
					name:searchItem.name,
					current:1,
				}))
				.then((response) => {
					if (response.data.code == '0000') {
						this.allItems = response.data.result.resultList;
						this.total = response.data.result.count/5
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
