<template>
	<div class="blockdL">
		<div class="breadcrumb">
		    <el-breadcrumb separator="/">
		        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
		        <el-breadcrumb-item>用户信息管理</el-breadcrumb-item>
		    </el-breadcrumb>
		</div>

		<div class="article">
			<h2>用户信息查询</h2>

			<div class="edit">
					<div class="edit">
					<el-form label-width="120px" :model="searchItem" onsubmit="return false;">
					<el-form-item label="用户查询">
						<el-input placeholder="输入爱的号"  v-model="searchItem.tradeNo" @keyup.enter.native="searchItemMethod"></el-input>
					</el-form-item>

					<el-form-item>
						<el-button type="primary"  @click="searchItemMethod" style="position: absolute;left: 292px;top: -58px;">搜索</el-button>

					</el-form-item>
				</el-form>
			</div>

			</div>

			<div class="table">

			<el-table :data="allItems" border style="width: 100%" max-height="550">
    <el-table-column fixed	prop="userid"  label="用户id"  width="220">
    </el-table-column>
    <el-table-column prop="eyedid" label="爱的号"  width="150">
    </el-table-column>
   <el-table-column prop="hotInformation.liveness" label="活跃度"  width="150">
    </el-table-column>
    <el-table-column prop="userage" label="年龄"  width="100">
    </el-table-column>
     <el-table-column prop="hotInformation.nickname" label="昵称"  width="220">
    </el-table-column>
     <el-table-column prop="hotInformation.phonenumber" label="手机号"  >
    </el-table-column>
      <el-table-column prop="userLocation.deviceid" label="手机IMEI"  >
    </el-table-column>
  
  
    
  
     
    <el-table-column   fixed="right" label="操作"  width="200">
      <template scope="scope">
      	  <el-button  type="text"  size="small">
         查看 &amp; 编辑
        </el-button>
        <!--<el-button  type="text"  size="small">
          删除
        </el-button>-->
      </template>
    </el-table-column>
  </el-table>


			</div>
			<!--分页组件-->
			  <div class="block">
			    <el-pagination
			      @current-change="payWater"
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
					tradeNo:'获取数据中',
					walletID:'获取数据中',
					payName:'获取数据中',
					businessName:'获取数据中',
					thirdTradeNo:'获取数据中',
					status:'获取数据中',
					startTime:'获取数据中',
					endTime:'获取数据中',
					remark:'获取数据中',
					createTime:'获取数据中',
					userID:'获取数据中',
					invoiceValue:'获取数据中',
					walletCreatTime:'获取数据中',
					dayLimit:'获取数据中',
					phoneNumber:'获取数据中'

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
				axios.post('eyed/web/user/findInformations.action',qs.stringify({
					current:1,
					length:3
				}))
				.then((response)=>{
						if (response.data.code == '0000') {
						this.allItems = response.data.result.resultList
						this.total = (response.data.result.count/3)*10
						console.log(response.data.result.resultList)
					} else {
						alert(response.data.msg);
						console.log('服务器返回值不为：0000');
					};
				})
				.catch((error)=>{
					console.log(error);
				});
			},
			payWater(val){
				//点击分页让当前对象的滚动条返回顶部
				document.getElementsByClassName("el-table__body-wrapper")[0].scrollTop=0
				this.page=val;
				let searchItem = this.searchItem;
				axios.post('eyed/web/user/findInformations.action', qs.stringify({
					current:val,
					length:3,
					userid:searchItem.tradeNo,
				}))
				.then((response) => {
					this.allItems = response.data.result.resultList;
					console.log(response.data.result.resultList)
				})
				.catch((error) => {
					console.log(error);
				});
			},
			searchItemMethod () {
				this.page=1;
				document.getElementsByClassName("el-table__body-wrapper")[0].scrollTop=0;
				let searchItem = this.searchItem;
				axios.post('eyed/web/user/findInformations.action', qs.stringify({
					eyednumber:searchItem.tradeNo,
					current:1,
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

		}
		}


</script>
