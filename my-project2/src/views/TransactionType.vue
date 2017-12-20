<template>
	<div class="eyedcode">
		<div class="breadcrumb">
		    <el-breadcrumb separator="/">
		        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
		        <el-breadcrumb-item>交易类型管理</el-breadcrumb-item>
		    </el-breadcrumb>
		</div>

		<div class="article">
			<h2>交易类型管理</h2>
			<div class="table-container">
				<div class="table">
					<div class="edit" >
						<el-form label-width="120px" :model="searchItemY" onsubmit="return false;">
							<el-form-item label="查询支付类型" >
								<el-input placeholder="请输入主键"  v-model="searchItemY.payid" ></el-input>
							</el-form-item>
							<el-form-item >
								<el-button type="primary" >搜索</el-button>
								<el-button type="info" :plain="true" @click="openAddDialogMethod" >添加</el-button>
							</el-form-item>
						</el-form>

					</div>
					<h3>支付类型</h3>
					<el-table border style="width: 100%" height="440" :data="allItemsW">

						<el-table-column prop="payid" label="主键" width="65"></el-table-column>
						<el-table-column prop="payname" label="支付类型名称"></el-table-column>
						<el-table-column prop="status" label="状态" width="65"></el-table-column>
						<el-table-column prop="createtime" label="创建（更改）时间" width="120">
						  <template scope="scope">
					       <!-- <el-icon name="time"></el-icon>-->
					        <span >{{ scope.row.createtime|discount}}</span>
					     </template>
						</el-table-column>
						<el-table-column prop="createname" label="创建（更改）人" ></el-table-column>
						<el-table-column  label="修改操作" >
							<template scope="scope">
									<el-button type="primary"  @click="payTypeStatus(scope.$index)">切换状态</el-button>
								</template>
						</el-table-column>
						<el-table-column  label="修改操作" >
							<template scope="scope">
									<el-button type="warning"  @click="openEditDialogMethod(scope.$index)">修改</el-button>
								</template>
						</el-table-column>
					</el-table>
				</div>

				<div class="table">
						<div class="edit" >
							<el-form label-width="120px" :model="searchItem" onsubmit="return false;">
								<el-form-item label="查询业务类型" >
									<el-input placeholder="请输入主键"  v-model="searchItem.eyednumber" ></el-input>
								</el-form-item>
								<el-form-item >
									<el-button type="primary"  >搜索</el-button>
									<el-button type="info" :plain="true" @click="openAddDialogMethod2" >添加</el-button>
								</el-form-item>
							</el-form>
						</div>
					<h3>业务类型</h3>
					<el-table border style="width: 100%" height="440" :data="allItemsY">
						<el-table-column prop="businessid" label="主键" width="65"></el-table-column>
						<el-table-column prop="businessname" label="业务类型名称"></el-table-column>
						<el-table-column prop="status" label="状态" width="65"></el-table-column>
						<el-table-column prop="createtime" label="创建（更改）时间" width="120">>
						  <template scope="scope">
					      <!--  <el-icon name="time"></el-icon>-->
					        <span>{{ scope.row.createtime|discount}}</span>
					     </template>
						</el-table-column>
						<el-table-column prop="createname" label="创建（更改）人" ></el-table-column>
						<el-table-column  label="开启操作" >
							<template scope="scope">
									<el-button type="primary"  @click="payTypeStatus2(scope.$index)">切换状态</el-button>
								</template>
						</el-table-column>
						<el-table-column  label="修改操作" >
							<template scope="scope">
								<span class="wrapper">
									<el-button type="warning" @click="openEditDialogMethod2(scope.$index)"  >修改</el-button>
								</span>
								</template>
						</el-table-column>

					</el-table>
				</div>
			</div>



			<el-dialog title="添加" v-model="isAdd">
				<el-form :model="addItem">
					<el-form-item label="payname" :label-width="formLabelWidth">
						<el-input auto-complete="off"  v-model="addItem.payname"></el-input>
					</el-form-item>
					<el-form-item label="createname" :label-width="formLabelWidth">
						<el-input auto-complete="off"  v-model="addItem.createname"></el-input>
					</el-form-item>

				</el-form>
				<div slot="footer" class="dialog-footer">
					<el-button type="primary" @click="addItemMethod">添 加</el-button>
					<el-button @click="closeAddDialogMethod">取 消</el-button>
				</div>
			</el-dialog>




			<el-dialog title="添加" v-model="isDel">
				<el-form :model="addItem">
					<el-form-item label="businessname" :label-width="formLabelWidth">
						<el-input auto-complete="off"  v-model="addItem.businessname"></el-input>
					</el-form-item>
					<el-form-item label="createname" :label-width="formLabelWidth">
						<el-input auto-complete="off"  v-model="addItem.createname"></el-input>
					</el-form-item>

				</el-form>
				<div slot="footer" class="dialog-footer">
					<el-button type="primary" @click="addItemMethod2">添 加</el-button>
					<el-button @click="closeAddDialogMethod">取 消</el-button>
				</div>
			</el-dialog>



				<el-dialog title="修改" v-model="isEdit">
				<el-form :model="editItem">
					<el-form-item label="payid"  :label-width="formLabelWidth">
						<el-input auto-complete="off" :disabled="true" v-model="editItem.payid"></el-input>
					</el-form-item>

					<el-form-item label="payname" :label-width="formLabelWidth">
						<el-input auto-complete="off"  v-model="editItem.payname"></el-input>
					</el-form-item>
				<el-form-item label="status" :label-width="formLabelWidth">
						<el-input auto-complete="off"  v-model="editItem.status"></el-input>
					</el-form-item>
					<el-form-item label="createname" :label-width="formLabelWidth">
						<el-input auto-complete="off"  v-model="editItem.createname"></el-input>
					</el-form-item>
				</el-form>
				<div slot="footer" class="dialog-footer">
					<el-button type="primary" @click="editItemMethod">确定</el-button>
					<el-button @click="closeAddDialogMethod">取 消</el-button>
				</div>
			</el-dialog>

			<el-dialog title="修改" v-model="isEdit2">
				<el-form :model="editItem">
					<el-form-item label="businessid"  :label-width="formLabelWidth">
						<el-input auto-complete="off" :disabled="true"  v-model="editItem.businessid"></el-input>
					</el-form-item>
					<el-form-item label="businessname" :label-width="formLabelWidth">
						<el-input auto-complete="off"  v-model="editItem.businessname"></el-input>
					</el-form-item>
					<el-form-item label="status" :label-width="formLabelWidth">
						<el-input auto-complete="off"  v-model="editItem.status"></el-input>
					</el-form-item>

					<el-form-item label="createname" :label-width="formLabelWidth">
						<el-input auto-complete="off"  v-model="editItem.createname"></el-input>
					</el-form-item>

				</el-form>
				<div slot="footer" class="dialog-footer">
					<el-button type="primary" @click="editItemMethod2">确定</el-button>
					<el-button @click="closeAddDialogMethod">取 消</el-button>
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
				searchItemY:{
					eyednumber: '',
				},
				searchItem: {
					eyednumber: '',
				},
				// 支付类型
				allItemsW: [{
					payid: '获取数据中',
					payname: '获取数据中',
					status: '获取数据中',
					createtime: '获取数据中',
					createname: '获取数据中',
				}],
					//业务类型
				allItemsY: [{
					businessid: '获取数据中',
					businessname: '获取数据中',
					status: '获取数据中',
					createtime: '获取数据中',
					createname: '获取数据中',
				}],

				formLabelWidth: '120px',
				// add 弹出框 flag，及表单 v-model 初始值
				isAdd: false,
				addItem:{
					payname: '',
					createname: '',
					businessname:'',
				},
				isDel:false,

				// edit 弹出框 flag，及表单 v-model 初始值
				isEdit: false,
				isEdit2: false,
				editIndex: '',
				editItem: {
					payid:'',
					status:'',
					payname:'',
					createname:'',
					businessid:'',
					businessname:''
				},
				//saveItem: {},
			};
		},
	

		created () {
			// 路由导航完成后，获取 allItems
			this.getAllItemsMethod();
			this.getAllItemsMethod2();
		},

		methods: {
			// 获取 allItemW
			getAllItemsMethod () {
				axios.get( '/eyed/web/wallet/typeManger/selectPayType.action')
				.then((response) => {
					this.allItemsW = response.data.result;
					console.log(response.data.result)
				})
				.catch((error) => {
					console.log(error);
				});
			},

			// 获取 allItemY
			getAllItemsMethod2() {
				axios.get('/eyed/web/wallet/typeManger/selectBusinessType.action')
				.then((response) => {
					this.allItemsY = response.data.result;
				})
				.catch((error) => {
					console.log(error);
				});
			},


			//关闭弹框
			closeAddDialogMethod () {
				this.isDel=false,
				this.isAdd = false;
				this.isEdit = false;
				this.isEdit2 = false;
				// 清空数据
				this.addItem = {
					payname: '',
					createname: '',
					businessname:'',

				};
				this.editItem={
					payid:'',
					status:'',
					payname:'',
					createname:''
				};
			},

			deleteItemMethod () {

			},
			// 打开添加弹框
			openAddDialogMethod () {
			this.isAdd = true;

			},
			openAddDialogMethod2 () {
			this.isDel = true;

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
			this.editItem = this.clone(this.allItemsW[index]);
			},
			openEditDialogMethod2 (index) {
			this.isEdit2 = true;
			this.editItem = this.clone(this.allItemsY[index]);
			},
			//添加
			addItemMethod () {

				let addItem = this.addItem;
				axios.post('/eyed/web/wallet/typeManger/addPayType.action', qs.stringify({
					payname: addItem.payname,
					createname:addItem.createname
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
			//添加
				addItemMethod2() {
				let addItem = this.addItem;
				axios.post('/eyed/web/wallet/typeManger/addBusinessType.action', qs.stringify({
					businessname: addItem.businessname,
					createname:addItem.createname
				}))
				.then((response) => {
					if (response.data.code == '0000') {
						// 添加完成重新获取 allItems
						this.getAllItemsMethod2();
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
			//状态切换
			payTypeStatus(index){
				this.$confirm('此操作将切换状态, 是否继续?', '提示', {
		        confirmButtonText: '确定',
		        cancelButtonText: '取消',
		        type: 'warning'
		        }).then(() => {
		          	//确定执行
         		this.editItem = this.clone(this.allItemsW[index]);
				if(this.editItem.status==1){
					this.editItem.status=2
				}else{
					this.editItem.status=1
				}
				let s = this.editItem.status
				let id = this.editItem.payid
				console.log(s)
				axios.post('/eyed/web/wallet/typeManger/updatePayTypeStatus.action', qs.stringify({
					payId:id,
					status:s,
				}))
				.then((response) => {
					if (response.data.code == '0000') {
						// 添加完成重新获取 allItems
						this.getAllItemsMethod();
					} else {
						console.log('服务器返回值不为：0000，添加失败');
					};
				})
				.catch((error) => {
					console.log(error);
				});

        }).catch(() => {

        });









			},
			payTypeStatus2(index){
				this.editItem = this.clone(this.allItemsY[index]);

				if(this.editItem.status==1){
					this.editItem.status=2
				}else{
					this.editItem.status=1
				}

				let id = this.editItem.businessid
				let s = this.editItem.status
				console.log(s)
				console.log(id)
				axios.post('/eyed/web/wallet/typeManger/updateBusinessTypeStatus.action', qs.stringify({
					businessId:id,
					status:s,
				}))
				.then((response) => {
					if (response.data.code == '0000') {
						// 添加完成重新获取 allItems
						this.getAllItemsMethod2();
					} else {
						console.log('服务器返回值不为：0000，添加失败');
					};
				})
				.catch((error) => {
					console.log(error);
				});
			},

			//修改
			editItemMethod () {
				let editItem = this.editItem;
				axios.post('/eyed/web/wallet/typeManger/updatePayType.action', qs.stringify({
					payid: editItem.payid,
					payname:editItem.payname,
					status:editItem.status,
					createname:editItem.createname
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
			editItemMethod2(){
					let editItem = this.editItem;
					console.log(editItem.businessid)
					console.log(editItem.businessname)

				axios.post('/eyed/web/wallet/typeManger/updateBusinessType.action', qs.stringify({
					businessid: editItem.businessid,
					businessname:editItem.businessname,
					status:editItem.status,
					createname:editItem.createname
				}))
				.then((response) => {
					if (response.data.code == '0000') {
						// 添加完成重新获取 allItems
						this.getAllItemsMethod2();
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
		},
	};
</script>

<style lang="scss">
	.table-container {
		display: flex;

		.table {
			flex: 1;

			&:first-of-type {
				margin-right: 20px;
			}

			&:last-of-type {
				margin-left: 20px;
			}

			h3 {
				margin-bottom: 8px;
			}
		}
	}
</style>
