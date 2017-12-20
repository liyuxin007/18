<template>
	<div class="blockdL">
		<div class="breadcrumb">
		    <el-breadcrumb separator="/">
		        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
		        <el-breadcrumb-item>黑名单管理</el-breadcrumb-item>
		    </el-breadcrumb>
		</div>

		<div class="article">
			<h2>黑名单管理</h2>

			<div class="edit">
			<div class="edit">
				<el-form label-width="120px" :model="searchItem" onsubmit="return false;">
					<el-form-item label="主键" style="display: inline-block;">
						<el-input placeholder="输入主键"  v-model="searchItem.likeName" @keyup.enter.native="searchItemMethod"></el-input>
					</el-form-item>
					<el-form-item style="display: inline-block;">
						<el-button type="primary"  @click="searchItemMethod" >搜索</el-button>

					</el-form-item>
				</el-form>
			</div>
			</div>

			<div class="table">
				<el-table border style="width: 100%" height="440" :data="allItems">
					<el-table-column prop="userid" label="用户ID"></el-table-column>
					<el-table-column prop="blockeduserid" label="黑名单ID"></el-table-column>
					<el-table-column prop="blockedtime" label="拉黑时间">
						<template scope="scope">
					        <span >{{ scope.row.blockedtime|discount}}</span>
					    </template>
					</el-table-column>
					<el-table-column prop="blockedstatus" label="黑名单状态">
						<template scope="scope">
					        <span >{{ scope.row.blockedstatus|discounts}}</span>
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
			<!--分页组件-->
			<div class="block">
			    <el-pagination
			   	  @current-change="blacklist"
			      :current-page="page"
			      layout="prev, pager, next, jumper"
			      :total="total"
			      >
			    </el-pagination>
			</div>
			<el-dialog title="查看 & 编辑" v-model="isEdit">
				<el-form :model="editItem">
					<el-form-item label="blockedlistid" :label-width="formLabelWidth">
						<el-input auto-complete="off" :disabled="true" v-model="editItem.blockedlistid"></el-input>
					</el-form-item>
					<el-form-item label="userid" :label-width="formLabelWidth">
						<el-input auto-complete="off" placeholder="string" v-model="editItem.userid"></el-input>
					</el-form-item>
					<el-form-item label="blockeduserid" :label-width="formLabelWidth">
						<el-input auto-complete="off" placeholder="string" v-model="editItem.blockeduserid"></el-input>
					</el-form-item>
					<el-form-item label="blockedstatus" :label-width="formLabelWidth">
						<el-input auto-complete="off" placeholder="string" v-model="editItem.blockedstatus"></el-input>
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
					likeName: '',
				},
				
				// 表格数据
				allItems: [{
					userid: '获取数据中',
					blockeduserid: '获取数据中',
					blockedtime: '获取数据中',
					blockedstatus: '获取数据中',
				}],

				formLabelWidth: '120px',
				
				// edit 弹出框 flag，当前编辑项 editIndex，及表单 v-model 初始值
				isEdit: false,
				editIndex: '',
				editItem: {},
				//saveItem: {},
			};
		},
		filters: {
              discounts : function(val){
				if(val==0){
					val="完全拉黑"
				}else{
					val="不给看资料"
				};
				var t = val
				return t
			              }
			        },
		created () {
			// 路由导航完成后，获取 allItems
			this.getAllItemsMethod();
		},

		methods: {
			// 获取 allItems
			getAllItemsMethod () {
				axios.post('/eyed/web/friend/findBlockedList.action',qs.stringify({
					current:1,
					length:3
				}))
				.then((response) => {

					this.allItems = response.data.result.resultList;
					this.total = (response.data.result.count/3)*10
					console.log(response.data);
				})
				.catch((error) => {
					console.log(error);
				});
			},
			blacklist(val){
				//点击分页让当前对象的滚动条返回顶部
				document.getElementsByClassName("el-table__body-wrapper")[0].scrollTop=0;
				let searchItem = this.searchItem;
				this.page=val;
				axios.post('/eyed/web/friend/findBlockedList.action', qs.stringify({
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
					blockedlistid: '',
					userid: '',
					blockeduserid: '',
					blockedstatus: '',
				};
			},
			editItemMethod () {
				let editItem = this.editItem;
				axios.post('/eyed/web/updateBlockedList.action', qs.stringify({
					userid: editItem.userid,
					blockedlistid:editItem.blockedlistid,
					blockeduserid:editItem.blockeduserid,
					blockedstatus: editItem.blockedstatus,
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
				let searchItem=this.searchItem;
				this.page=1;
				axios.post('/eyed/web/friend/findBlockedList.action', qs.stringify({
					likeStr:searchItem.likeName,
					current:this.page,
					length:3
				}))
				.then((response) => {
					if (response.data.code == '0000') {
						if(response.data.result.count=='0'){
							alert("没有查找到此账号")
						}else{
						this.allItems= response.data.result.resultList;
						this.total = (response.data.result.count/3)*10
						}
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
