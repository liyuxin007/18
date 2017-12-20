<template>
	<div class="userActivity">
		<div class="breadcrumb">
		    <el-breadcrumb separator="/">
		        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
		        <el-breadcrumb-item>用户活动管理</el-breadcrumb-item>
		        <el-breadcrumb-item>活动管理</el-breadcrumb-item>
		    </el-breadcrumb>
		</div>

		<div class="article">
					<div class="edit disa" >
						<el-form label-width="120px" :model="searchItemQ" onsubmit="return false;">
							<el-form-item label="查询活动群" class='disa'>
								<el-input placeholder="爱的群ID"  v-model="searchItemQ.groupID" @keyup.enter.native="searchItemMethodQ"></el-input>
							</el-form-item >
								<el-button type="primary"  @click="searchItemMethodQ" id="search">搜索</el-button>
						</el-form>

					</div>
			<div class="edit disa" >
						<el-form label-width="120px" :model="searchItem" onsubmit="return false;">
							<el-form-item label="查询活动群主" class='disa'>
								<el-input placeholder="群主爱的号"  v-model="searchItem.eyedID" @keyup.enter.native="searchItemMethod"></el-input>
							</el-form-item>
								<el-button type="primary"  @click="searchItemMethod" id="searchtow">搜索</el-button>
						</el-form>
					</div>

						<el-form label-width="80px" :model="center" class='disa' >
								<el-form-item label="经度:" class='disa' id="longitude">
									<el-input placeholder="输入经度" style="width: 100px;"  v-model.number="center.lng"  ></el-input>
								</el-form-item>
								<el-form-item label="纬度:" class='disa'>
									<el-input placeholder="输入纬度"  style="width: 100px;" v-model.number="center.lat" ></el-input>
								</el-form-item>
								<el-button type="primary" id="chaxun">主要按钮</el-button>
						</el-form>
			<h2>用户活动管理</h2>

			<div class="table">
				<el-table border  height="600" :data="allItems" class="tab">
					<el-table-column prop="groupID" label="群ID" width="90"></el-table-column>
					<el-table-column prop="groupName" label="群名称"></el-table-column>
					<el-table-column prop="eyedID" label="群主爱的号"></el-table-column>
					<el-table-column prop="nickName" label="群主昵称"></el-table-column>
					<el-table-column prop="groupLongitude" label="位置经度"></el-table-column>
					<el-table-column prop="groupLatitude" label="位置纬度"></el-table-column>
					<el-table-column label="编辑">
						<template scope="scope">
							<el-button type="text" @click="openEditDialogMethod(scope.$index)">查看信息 </el-button>
						</template>
					</el-table-column>
					<el-table-column label="位置">
						<template scope="scope">
							<el-button type="text" @click="openEditDialogMethod2(scope.$index)">查看位置 </el-button>
						</template>
					</el-table-column>
				</el-table>
			</div>
				<div class="block" style="position: absolute;bottom: 40px;">
			    <el-pagination
			      :current-page="page"
			      layout="prev, pager, next, jumper"
			      :total="total"
			      @current-change="activityManagement"
			      >
			    </el-pagination>
			  </div>
			
			
			
					  <div id="map"></div>
			<el-dialog title="查看 & 编辑" v-model="isEdit">
					<el-table border  height="600" :data="allItems">
						<el-table-column prop="groupID" label="群ID" width="90"></el-table-column>
						<el-table-column prop="groupName" label="群名称"  width="130"></el-table-column>
						<el-table-column prop="eyedID" label="用户爱的号ID" width="90"></el-table-column>
						<el-table-column prop="nickName" label="用户名称"  width="120"></el-table-column>
						<el-table-column prop="groupLocation" label="活动位置" width="180"></el-table-column>
						<el-table-column prop="userID" label="用户ID"></el-table-column>
						<el-table-column prop="createTime" label="创建时间" width="120">
						<template scope="scope">
					        <span >{{ scope.row.createTime|discount}}</span>
					    </template>
						</el-table-column>
						<el-table-column prop="startTime" label="开始时间" width="120">
						<template scope="scope">
					        <span >{{ scope.row.startTime|discount}}</span>
					    </template>
						</el-table-column>
						<el-table-column prop="endTime" label="结束时间" width="120">
						<template scope="scope">
					        <span >{{ scope.row.endTime|discount}}</span>
					    </template>
						</el-table-column>
						<el-table-column prop="groupLongitude" label="位置经度"></el-table-column>
						<el-table-column prop="groupLatitude" label="位置纬度"></el-table-column>
					</el-table>

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
					eyedID: '',

				},
				aa:'',
				searchItemQ:{
					groupID: '',
				},
				// 表格数据
				allItems: [{
					groupID: '获取数据中',
					groupName: '获取数据中',
					eyedID: '获取数据中',
					nickName: '获取数据中',
					groupLocation: '获取数据中',
					userID: '获取数据中',
					createTime: '获取数据中',
					startTime: '获取数据中',
					endTime: '获取数据中',
					groupLongitude: '获取数据中',
					groupLatitude: '获取数据中',

				}],

				formLabelWidth: '120px',
				// add 弹出框 flag，及表单 v-model 初始值

				// edit 弹出框 flag，当前编辑项 editIndex，及表单 v-model 初始值
				isEdit: false,
				editIndex: '',
				editItem: {},
				//saveItem: {},
				 center: {
			        lng: '',
			        lat:''
			      },
			      zoom: 15,

			};
		},

		created () {
			// 路由导航完成后，获取 allItems
			this.getAllItemsMethod();
		},
		//百度地图原生JS
		mounted:function(){
		var map = new BMap.Map("map");
		map.enableScrollWheelZoom(true);
		map.centerAndZoom(new BMap.Point(116.401398,39.914445),15);
		var chaxun = document.getElementById("chaxun")
		chaxun.onclick=function(){
			if(document.getElementsByClassName("el-input__inner")[2].value != "" && document.getElementsByClassName("el-input__inner")[3].value != ""){
				map.clearOverlays();
				var new_point = new BMap.Point(document.getElementsByClassName("el-input__inner")[2].value,document.getElementsByClassName("el-input__inner")[3].value);
				var marker = new BMap.Marker(new_point);  // 创建标注
				map.addOverlay(marker);              // 将标注添加到地图中
				marker.enableDragging();  			//启动拖拽
				marker.setAnimation(BMAP_ANIMATION_BOUNCE); //标注动画
				map.panTo(new_point);
				}
			marker.addEventListener("dragend", function(e){
   				document.getElementsByClassName("el-input__inner")[2].value=e.point.lng;
   				document.getElementsByClassName("el-input__inner")[3].value=e.point.lat;
		})
		}
		},
		methods: {
			fireFox(){
				 if (navigator.userAgent.indexOf('Firefox') >= 0){
				 	alert('你是使用Firefox')
				 	var inputTop = document.getElementById("search")
				 	inputTop.setAttribute("style","position: relative;top: -12px;")
				 	console.log(inputTop)
				 	}
			},

			 	syncCenter (e) {
			      const {lng, lat} = e.target.getCenter();
			      this.center.lng = lng;
			      this.center.lat = lat;
			    },
			    syncZoom (e) {
			      this.zoom = e.target.getZoom();
			    },

			// 获取 allItems
			getAllItemsMethod () {
				axios.post('/eyed/web/eyedGroup/selectALLGroupImformations.action', qs.stringify({
					current:1,
				}))
				
				.then((response) => {
					this.allItems = response.data.result.resultList;
					this.total = response.data.result.count/5
					console.log(response.data.result)
				})
				.catch((error) => {
					console.log(error);
				});
			},
			//分页切换
			activityManagement(val){
				let searchItemQ = this.searchItemQ;
				let searchItem = this.searchItem;
				//点击分页让当前对象的滚动条返回顶部
				document.getElementsByClassName("el-table__body-wrapper")[0].scrollTop=0
				this.page=val;
				axios.post('/eyed/web/eyedGroup/selectALLGroupImformations.action', qs.stringify({
					current:val,
					groupID:searchItemQ.groupID,
					eyedID:searchItem.eyedID,
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
			
			openEditDialogMethod2(index){
				this.aa=true;
				this.editIndex = index;
				document.getElementsByClassName("el-input__inner")[2].value=parseFloat(this.allItems[index].groupLongitude);
   				document.getElementsByClassName("el-input__inner")[3].value=parseFloat(this.allItems[index].groupLatitude);
   				//openEditDialogMethod2点击事件触发chaxun点击事件
				chaxun.click()
			},
		
			//查询活动群
			searchItemMethodQ() {
			
        	let searchItemQ = this.searchItemQ;
			//初始化分页值
			this.page=1;
	        axios.post('/eyed/web/eyedGroup/selectALLGroupImformations.action', qs.stringify({
	          groupID:searchItemQ.groupID,
	          
	          current:this.page,
	        }))
	          .then((response) => {
	            if (response.data.code == '0000') {
	              this.allItems= response.data.result.resultList;
	              this.total =  response.data.result.count/5;
	              console.log(response.data.result)
	            } else {
	              alert(response.data.msg);
	              console.log('服务器返回值不为：0000，查询失败！');
	            };
	          })
	          .catch((error) => {
	            console.log(error);
	          });
	      },
			// 查询活动群主
			searchItemMethod () {
				console.log("bbb")
				let searchItem = this.searchItem;
       			this.page=1;
				axios.post('/eyed/web/eyedGroup/selectALLGroupImformations.action', qs.stringify({
					eyedID:searchItem.eyedID,
					current:this.page,
				}))
				.then((response) => {
					if (response.data.code == '0000') {
						this.allItems= response.data.result.resultList;
						this.total =  response.data.result.count/5;
						console.log(response.data.result)
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
	.tab{
		width: 50%;margin:1% 0 0 0;float: left;
	};
	#map{

		width: 45%;
		display: inline-block;
		height: 600px;
		margin:1% 0 0 1%;
		float: left;

	};


</style>
