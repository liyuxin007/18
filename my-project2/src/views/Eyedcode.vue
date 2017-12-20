<template>
	<div class="eyedcode">
		<div class="breadcrumb">
		    <el-breadcrumb separator="/">
		        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
		        <el-breadcrumb-item>爱的号管理</el-breadcrumb-item>
		    </el-breadcrumb>
		</div>
		<div class="article">
			<h2>爱的号管理</h2>
			<div class="table-container">
				<div class="table">
					<div class="edit" >
						<el-form label-width="120px" :model="searchItemY" onsubmit="return false;">
							<el-form-item label="已使用列表查询" >
								<el-input placeholder="爱的编号"  v-model="searchItemY.eyednumber" @keyup.enter.native="searchItemMethodY" ></el-input>
							</el-form-item>
							<el-form-item >
								<el-button type="primary"  @click="searchItemMethodY" class="userEyed">搜索</el-button>
							</el-form-item>
						</el-form>
					</div>
					<h3>已使用</h3>
					<el-table border style="width: 100%" height="440" :data="allItemsY">
						<el-table-column prop="eyednumber" label="爱的编号" width="100"></el-table-column>
						<el-table-column prop="codeType" label="号码类型"  width="100">
						<template scope="scope">
					        <span >{{ scope.row.codeType|discount}}</span>
					    </template>
						</el-table-column>
						<el-table-column prop="removereason" label="爱的分配原因" ></el-table-column>
						<el-table-column prop="updateTime" label="变更时间" width="120"></el-table-column>
						<el-table-column label="分配操作" width="140">
								<template scope="scope">
									<!--<el-button type="primary"  @click="openAddDialogMethod(scope.$index)" >分配到未使用</el-button>-->
								</template>
						</el-table-column>
					</el-table>
				<!--分页组件-->	
				<div class="block">
				    <el-pagination
				      :current-page="page"
				      layout="prev, pager, next, jumper"
				      :total="total" 
				      @current-change="handleCurrentChange">
				    </el-pagination>
				</div>
				</div>
				<div class="table">
						<div class="edit " >
							<el-form label-width="130px" :model="searchItem" onsubmit="return false;">
								<el-form-item label="未使的号查询" >
									<el-tooltip placement="top">
									  <div slot="content">搜索时请切换到相应搜索号码类型</div>
									  	<el-input placeholder="爱的编号"  v-model="searchItem.eyednumber" @keyup.enter.native="searchItemMethod" ></el-input>
									</el-tooltip>
								</el-form-item>
								<el-form-item >
									<el-button type="success" @click="openDelDialogMethod"   class="unUserEyed_add">添加</el-button>
									<el-button type="primary"  @click="searchItemMethod" class="unUserEyed">搜索</el-button>
								</el-form-item>
							</el-form>
						</div>
						<!--未使用的普通号-->
						<div class="disnoneW">
					<div>
						<h3 style="display: inline-block;">未使用普通号  </h3> 
						
						<el-button type="warning"  class="disnonew" @click="disnonew">切换到未使用的靓号</el-button>
					</div>
					<el-table border style="width: 100%" height="440" :data="allItemsW">
						<el-table-column prop="eyednumber" label="爱的编号" width="200"></el-table-column>
						<el-table-column prop="codeType" label="号码类型"  width="100">
						<template scope="scope">
					        <span >普通</span>
					    </template>
						</el-table-column>
						<el-table-column label="分配操作" >
							<template scope="scope">
									<!--<el-button type="info" @click="distriBution">分配到指定用户</el-button>-->
							</template>
						</el-table-column>
					</el-table>
						<!--分页组件-->	
				<div class="block">
				    <el-pagination
				      :current-page="unPage"
				      layout="prev, pager, next, jumper"
				      :total="unTotal" 
				      @current-change="unHandleCurrentChange"
				     >
				    </el-pagination>
				</div>
				
				 
				</div>
				<!--未使用的靓号-->
				<div style="display: none;" class="disnoneL" >
					<div>
						<h3 style="display: inline-block;">未使用的靓号</h3> 
						
					 	<el-button type="warning" class="disnonel" @click="disnonel">切换到未使用普通号</el-button>
					</div>
					<el-table border style="width: 100%" height="440" :data="allItemsWl">
						<el-table-column prop="eyednumber" label="爱的编号" width="200"></el-table-column>
						<el-table-column prop="codeType" label="号码类型"  width="100">
						<template scope="scope">
					        <span >{{ scope.row.codeType|discount}}</span>
					    </template>
						</el-table-column>
						<el-table-column label="分配操作" >
							<template scope="scope">
								<el-button type="info" @click="distriBution">分配到指定用户</el-button>
							</template>
						</el-table-column>
					</el-table>
						<!--分页组件-->	
				<div class="block a">
				    <el-pagination
				      :current-page="unPagel"
				      layout="prev, pager, next, jumper"
				      :total="unTotall" 
				    	@current-change="unHandleCurrentChangel"
				     >
				    </el-pagination>
				</div>
				</div>
				</div>
			</div>
			<!--爱的号生成弹框-->	
			<el-dialog title="批量添加爱的号" v-model="isDel">
				<span style="margin-left: 66px;">温馨提示：此操作将生成开始值和结束值之间的号码</span>
				<el-form :model="delItems">
					
					<el-form-item label="开始值" :label-width="formLabelWidth">
						<el-input auto-complete="off" :readonly=true v-model="delItems.startNumber"></el-input>
					</el-form-item>
					<el-form-item label="结束值" :label-width="formLabelWidth">
						<el-input auto-complete="off"  v-model="delItems.endNumber"></el-input>
					</el-form-item>
					
				</el-form>
				<div slot="footer" class="dialog-footer">
					<el-button type="warning" @click="deleteItemMethod">确认</el-button>
					<el-button type="primary" @click="closeDelDialogMethod">取 消</el-button>
				</div>
			</el-dialog>
			
			<el-dialog title="分配到指定用户" v-model="isAdd">
				<el-form :model="distribution">
					
					<el-form-item label="用户ID" :label-width="formLabelWidth">
						<el-input auto-complete="off"  v-model="distribution.userId" placeholder="查询完成用户ID再输入"></el-input>
					</el-form-item>
					<el-form-item label="爱的号" :label-width="formLabelWidth">
						<el-input auto-complete="off"  v-model="distribution.eyednumber" placeholder="用户购买的靓号"></el-input>
					</el-form-item>
					
				</el-form>
				<div slot="footer" class="dialog-footer">
					<el-button type="warning" @click="distribution_two">确认</el-button>
					<el-button type="primary" @click="closeDelDialogMethod">取 消</el-button>
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
				show:true,
				show1:true,
				
				//分页默认
				page:1,
				unPage:1,
				unPagel:1,
				//分页总数
				total:1,
				unTotal:1,
				unTotall:1,
				// 搜索输入框 v-model 初始值
				searchItemY:{
					eyednumber: '',
				},
				searchItem: {
					eyednumber: '',
				},
				// 未分配表格数据
				allItemsW: [{
					eyednumber: '获取数据中',
				}],
				allItemsWl: [{
					eyednumber: '获取数据中',
				}],
				distribution:{
					userId:'',
					eyednumber: '',
				},
					// 已分配表格数据
				allItemsY: [{
					eyednumber: '获取数据中',
					deleteEyedcodereason:'获取数据中',
					codeType:'获取数据中',
					removereason:'获取数据中',
					updateTime:'获取数据中'
				}],

				formLabelWidth: '120px',
				// add 弹出框 flag，及表单 v-model 初始值
				isAdd: false,
				
				isDel:false,
				delItem: {
					eyednumber: '',
				},
				delItems: {

					startNumber:'',
					endNumber:''
				},
				// edit 弹出框 flag，当前编辑项 editIndex，及表单 v-model 初始值
				isEdit: false,
				editIndex: '',
				editItem: {},
				//saveItem: {},
			};
		},
			filters: {
              discount : function(val){
				if(val==0){
					val="普通"
				}else{
					val="靓号"
				};
				var t = val
				return t
			              }
			        },
		created () {
			// 路由导航完成后，获取 allItems
			this.getAllItemsMethod();
			this.getAllItemsMethodY();
			this.getAllItemsMethodL() 
		},
	

		methods: {
			//点击切换靓号
			disnonel(){
				this.show=true;
				this.unPage=1;
				this.unPagel=1;
			var disnoneW = document.getElementsByClassName("disnoneW")[0];
			var disnoneL = document.getElementsByClassName("disnoneL")[0];
				disnoneL.style.display="none";
				disnoneW.style.display="block";
			},
			//点击切换普通号
			disnonew(){
				this.show=false;
				this.unPage=1;
				this.unPagel=1;
			var disnoneW = document.getElementsByClassName("disnoneW")[0];
			var disnoneL = document.getElementsByClassName("disnoneL")[0];
				disnoneW.style.display="none";
				disnoneL.style.display="block";
			},
			
			// 获取 所有未使用
			getAllItemsMethod () {
				axios.post('/eyed/web/eyedCode/findUnusedCodesBylike.action',qs.stringify({
					current:1,
					codeType:1,
				}))
				.then((response) => {
					this.allItemsW = response.data.result.codelist;
					this.unTotal =  response.data.result.count/5;
					
				})
				.catch((error) => {
					console.log(error);
				});
			},

			// 获取 已使用
			getAllItemsMethodY () {
				axios.post('/eyed/web/eyedCode/findUsedCodesBylike.action', qs.stringify({
					current:1,
				}))
				.then((response) => {
					this.allItemsY = response.data.result.codelist;
					this.total =  response.data.result.count/5;
					
					
				})
				.catch((error) => {
					console.log(error);
				});
			},
			//获取所有未使用的靓号
			getAllItemsMethodL () {
				axios.post('/eyed/web/eyedCode/findUsedCodesBylike.action', qs.stringify({
					current:1,
					codeType:1,
					removereason:"未分配",
				}))
				.then((response) => {
					this.allItemsWl=response.data.result.codelist
					this.unTotall =  response.data.result.count/5;
				})
				.catch((error) => {
					console.log(error);
				});
			},
			
			//已使用的分页切换
			handleCurrentChange(val){
				document.getElementsByClassName("el-table__body-wrapper")[0].scrollTop=0
				this.page=val
				//开关判断如果不是在搜索时切换分页的情况
				if(this.show1){
					axios.post('/eyed/web/eyedCode/findUsedCodesBylike.action', qs.stringify({
					current:val,
					
				}))
				.then((response) => {
					this.allItemsY = response.data.result.codelist;
					
				})
				.catch((error) => {
					console.log(error);
				});
				}else{
					//搜索时分页切换
					let searchItemY = this.searchItemY;
					axios.post('/eyed/web/eyedCode/findUsedCodesBylike.action', qs.stringify({
					eyednumber:searchItemY.eyednumber,
					current:val,
					removereason:"赋予"
				}))
				.then((response) => {
					if (response.data.code == '0000') {
						this.allItemsY = response.data.result.codelist;
					} else {
						alert(response.data.msg);
						console.log('服务器返回值不为：0000，查询失败！');
					};
				})
				.catch((error) => {
					console.log(error);
				});
					
				}
				
					
			},
			//未使用普通号的分页
			unHandleCurrentChange(val){
				document.getElementsByClassName("el-table__body-wrapper")[1].scrollTop=0
				console.log("b")
				//动态改变分页值，便于搜索返回到第一页
				this.unPage=val
				let searchItem = this.searchItem;
					axios.post('/eyed/web/eyedCode/findUnusedCodesBylike.action', qs.stringify({
					eyednumber:searchItem.eyednumber,
					current:val,
				}))
				.then((response) => {
					this.allItemsW = response.data.result.codelist;
				})
				.catch((error) => {
					console.log(error);
				});
			},
			//未使用靓号分页
			unHandleCurrentChangel(val){
				document.getElementsByClassName("el-table__body-wrapper")[2].scrollTop=0
				let searchItem = this.searchItem;
				console.log("a")
				this.unPagel=val
				//此接口后台集成，用未使用的接口加后台给的条件判断就是未使用的靓号
					axios.post('/eyed/web/eyedCode/findUsedCodesBylike.action', qs.stringify({
						eyednumber:searchItem.eyednumber,
					current:val,
					codeType:1,
					removereason:"未分配",
				}))
				.then((response) => {
					this.allItemsWl = response.data.result.codelist;
				})
				.catch((error) => {
					console.log(error);
				});
			},
			
			distriBution(){
				this.isAdd=true
			},
			distribution_two(){
					axios.post('/eyed/web/eyedCode/assignCodes.action', qs.stringify({
					eyednumber:this.distribution.eyednumber,
					userId:304
				}))
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
			//打开使用窗口
			openDelDialogMethod (index) {
				this.isDel = true;
				if(this.delItems.startNumber==''){
					axios.post('/eyed/web/eyedCode/getMaxCode.action')
					.then((response)=>{
						this.delItems.startNumber=response.data.result+1 
						
					})
					.catch((error) => {
						console.log(error);
					});
				}
			},
			closeDelDialogMethod () {
				this.isDel = false;
				this.isAdd = false;
				// 清空数据
				this.delItem = {
					eyednumber: '',
					deleteEyedcodereason: '',
				};
				this.delItems.endNumber=""
			},
			
			// 批量添加爱的号
			deleteItemMethod () {
				let difference = this.delItems.endNumber - this.delItems.startNumber
				if(this.delItems.endNumber&& difference>0){
					axios.post('/eyed/web/eyedCode/addCodesBatch.action', qs.stringify({
					minCode:this.delItems.startNumber,
					maxCode:this.delItems.endNumber
				}))
					.then((response)=>{
						
					})
					.catch((error) => {
						console.log(error);
					});
				}else{
					alert("请输入正确的值")
				}
				
			},
			// 由已使用分配未已使用
//			openAddDialogMethod (index) {
//				this.addIndex = index;
//				this.addItem = this.clone(this.allItemsY[index]);
//				let addItem = this.addItem;
//				axios.post('/eyed/web/rmoveEyedcodemoven.action', qs.stringify({
//					eyedCodeMovenID: addItem.eyednumber,
//				}))
//				.then((response) => {
//					if (response.data.code == '0000') {
//						this.getAllItemsMethod();
//						this.getAllItemsMethodY();
//					} else {
//						console.log('服务器返回值不为：0000，删除失败');
//					};
//				})
//				.catch((error) => {
//					console.log(error);
//				});
//			},
//			
			
			// 模糊的已使用查找

			searchItemMethodY(){
				this.show1=false;
				let searchItemY = this.searchItemY;
				//初始化分页值
				this.page=1;
				if(searchItemY.eyednumber){
					axios.post('/eyed/web/eyedCode/findUsedCodesBylike.action', qs.stringify({
					eyednumber:searchItemY.eyednumber,
					current:this.page,
					removereason:"赋予"
				}))
				.then((response) => {
					if (response.data.code == '0000') {
						if(response.data.result.count=='0'){
							alert("没有查找到此账号")
						}else{
						this.allItemsY = response.data.result.codelist;
						this.total =  response.data.result.count/5;
						}
					} else {
						alert(response.data.msg);
						console.log('服务器返回值不为：0000，查询失败！');
					};
				})
				.catch((error) => {
					console.log(error);
				});
				}else{
					this.show1=true;
					axios.post('/eyed/web/eyedCode/findUsedCodesBylike.action', qs.stringify({
					current:this.page,
				}))
				.then((response) => {
					if (response.data.code == '0000') {
						this.allItemsY = response.data.result.codelist;
						this.total =  response.data.result.count/5;
						if(response.data.result.count=='0'){
							alert("没有查找到此账号")
						}
					} else {
						alert(response.data.msg);
						console.log('服务器返回值不为：0000，查询失败！');
					};
				})
				.catch((error) => {
					console.log(error);
				});
				}
				
			},

			// 模糊的未使用查找
			searchItemMethod () {
				this.show2=false;
				if(this.show){
					let searchItem = this.searchItem;
      			this.unPage=1;
				axios.post('/eyed/web/eyedCode/findUnusedCodesBylike.action', qs.stringify({
					eyednumber:searchItem.eyednumber,
					current:this.unPage
				}))
				.then((response) => {
					if (response.data.code == '0000') {
						if(response.data.result.count=='0'){
							alert("没有查找到此账号")
						}else{
						this.allItemsW = response.data.result.codelist;
						this.unTotal =  response.data.result.count/5;
						console.log(response.data.result.count)
						}
						
					} else {
						alert(response.data.msg);
						console.log('服务器返回值不为：0000，查询失败！');
					};
				})
				.catch((error) => {
					console.log(error);
				});
				}else{
				let searchItem = this.searchItem;
      			this.unPage=1;
      			console.log(searchItem.eyednumber)
				axios.post('/eyed/web/eyedCode/findUsedCodesBylike.action', qs.stringify({
					codeType:1,
					removereason:"未分配",
					eyednumber:searchItem.eyednumber,
					current:this.unPage
				}))
				.then((response) => {
					if (response.data.code == '0000') {
						if(response.data.result.count=='0'){
							alert("没有查找到此账号")
						}else{
							this.allItemsWl= response.data.result.codelist;
						this.unTotall =  response.data.result.count/5;
						console.log(response.data.result)
						}
						
					} else {
						alert(response.data.msg);
						console.log('服务器返回值不为：0000，查询失败！');
					};
				})
				.catch((error) => {
					console.log(error);
				});
				}
				
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
	.block{
		margin-left: -5px!important;
		margin-top: 25px!important;
	}
	.unUserEyed_add{
		position: absolute;
		top: -58px;
		right: -227px;
	}
	.unUserEyed{
		position: absolute;
		top: -58px;
		right: -128px;
	}
	
	.userEyed{
		position: absolute;
		top: -58px;
		right: -211px;
	}
	.disnoneL{
		width: 796px!important;
	}
	.disnoneW{
		width: 796px!important;
	}
	.disnonel{
		position: absolute;
		right: 192px;
	}
	.disnonew{
		position: absolute;
		right: 192px;
	}
</style>
