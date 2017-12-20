
<template>
	<div class="blockdL">
		<div class="breadcrumb">
		    <el-breadcrumb separator="/">
		        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
		        <el-breadcrumb-item>APP问题反馈</el-breadcrumb-item>
		    </el-breadcrumb>
		</div>

		<div class="article">
			<h2>问题反馈</h2>

			<div class="edit">
					<div class="edit">
					<el-form label-width="120px" :model="searchItem" onsubmit="return false;">
					<el-form-item label="问题反馈查询">
						<el-input placeholder="输入反馈用户ID"  v-model="searchItem.feedbackuserid" @keyup.enter.native="searchItemMethod"></el-input>
					</el-form-item>
					<el-form-item>
						<el-button type="primary"  @click="searchItemMethod" class="feedBack">搜索</el-button>
					</el-form-item>
				</el-form>
			</div>

			</div>

			<div class="table">

			<el-table :data="allItems" border style="width: 100%" max-height="550">
    <el-table-column fixed	prop="createtime"  label="反馈时间"  width="220">

    </el-table-column>
    <el-table-column prop="problemid" label="问题反馈id"  width="150">
    </el-table-column>

    <el-table-column prop="feedbackuserid" label="反馈用户id"  width="150">
    </el-table-column>

    <el-table-column prop="feedbackcontext" label="反馈内容"  width="300">
    </el-table-column>

     <el-table-column prop="status" label="反馈状态"  width="120">
    </el-table-column>
     <el-table-column prop="disposeId" label="解决人用户id"  width="150">
    </el-table-column>
      <el-table-column prop="disposetime" label="解决时间"  width="220">
    </el-table-column>
     <el-table-column prop="mark" label="备注"  width="300">
    </el-table-column>
    <el-table-column   fixed="right" label="操作"  width="200">
      <template scope="scope">
      	  <el-button  type="text"  size="small">
         查看 &amp; 编辑
        </el-button>
   
      </template>
    </el-table-column>
  </el-table>
			</div>
			<!--分页组件-->
			<div class="block">
			    <el-pagination
			   	   @current-change="problemOfFeedback"
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
		data(){
			return {
				//分页默认
				page:1,
				//分页总数
				total:1,
				allItems:[{
					createtime:'获取数据中',
					problemid:'获取数据中',
					feedbackuserid:'获取数据中',
					feedbackcontext:'获取数据中',
					mark:'获取数据中',
					disposetime:'获取数据中',
					disposeId:'获取数据中',
					reportreason:'获取数据中',
					status:'获取数据中'
				}],
				searchItem: {
					reportid: '',
				},
			}
		},
		created () {
			// 路由导航完成后，获取 allItems
			this.getAllItemsMethod();
		},

		methods:{
			getAllItemsMethod(){
				axios.post('/eyed/web/problemOfFeedback/selectProblemOfFeedback.action',qs.stringify({
					current:1
				}))
				.then((response)=>{
						if (response.data.code == '0000') {
						console.log(response.data.result)
						this.allItems = response.data.result.resultList
						this.total = response.data.result.count/5
					} else {
						alert(response.data.msg);
						console.log('服务器返回值不为：0000');
					};
				})
				.catch((error)=>{
					console.log(error)
				});
			},
			problemOfFeedback(val){
				//点击分页让当前对象的滚动条返回顶部
				document.getElementsByClassName("el-table__body-wrapper")[0].scrollTop=0;
				let searchItem = this.searchItem;
				this.page=val;
				axios.post('/eyed/web/problemOfFeedback/selectProblemOfFeedback.action', qs.stringify({
					current:val,
					feedbackuserid:searchItem.feedbackuserid,
				}))
				.then((response) => {
					this.allItems = response.data.result.resultList;
					
				})
				.catch((error) => {
					console.log(error);
				});
			},
			searchItemMethod () {
				let searchItem = this.searchItem;
				this.page=1;
				axios.post('/eyed/web/problemOfFeedback/selectProblemOfFeedback.action', qs.stringify({
					feedbackuserid:searchItem.feedbackuserid,
					current:1,
				}))
				.then((response) => {
					if (response.data.code == '0000') {
						this.allItems= response.data.result.resultList;
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

		}
		}


</script>

<style type="text/css">
	.feedBack{
		position: absolute;
		top:-58px;
		right: -70px;
	}
</style>


