<template>
	<div>
		<div class="breadcrumb">
		    <el-breadcrumb separator="/" >
		        <el-breadcrumb-item to="/home">首页</el-breadcrumb-item>
		        <el-breadcrumb-item>用户活动管理</el-breadcrumb-item>
		        <el-breadcrumb-item>我的活动创建</el-breadcrumb-item>
		    </el-breadcrumb>
		</div>
		<div class="content" >
			<div class="img" v-for= "(item,index) in items">
				<div class="imgbox" @click="searchGroupNumber(index)">
					<div>点击查看群成员</div>
					<img  :src="item.groupPicturepath" alt=""  />
				</div>
				<p>{{item.gorupName}}</p>
				<p>{{item.groupID}}</p>
				 <el-button type="warning" @click="deleteItemMethod(item)">解散活动</el-button>
    			<el-button type="danger" class="el-buttonrt" @click="EditDialogMethod(item)">修改活动</el-button>
			</div>
			
			<div class="creat">
				<el-button type="text" @click="chuangjian" >活动创建</el-button>
			</div>
		<!--活动创建列表-->
		<el-dialog title="填写活动资料" v-model="dialogFormVisible" class="creatwidth">
			 <p >温馨提示：若时间无法显示请刷新</p>
		  <el-form :model="form"  enctype="multipart/form-data" id="formdata">
		  	  <el-form-item label="开始时间" :label-width="formLabelWidth" >
	         <el-date-picker 
	          :editable="false"
	          v-model="form.startTime1"
		      type="datetime" 
		      placeholder="选择日期时间" @change="dateChange">
		    </el-date-picker>
		   
		    </el-form-item>
		    <el-form-item label="结束时间" :label-width="formLabelWidth">
		    <el-date-picker
		      :editable="false"
		      v-model="form.endTime1"
		      type="datetime"
		      placeholder="选择日期时间" @change="dateChange1">
		    </el-date-picker>
		    </el-form-item>
		     <el-form-item label="活动类型" :label-width="formLabelWidth">
			  <el-select v-model="form2.groupLabelName" clearable placeholder="请选择" @change="changevalue">
			    <el-option v-for="item in label" :label="item.labelname" :value="item.labelid"  :key="item.labelid">
			      <span style="float: left">{{ item.labelname }}</span>
     			  <span style="float: right; color: #8492a6; font-size: 13px">{{ item.labelid }}</span>
			    </el-option>
			  </el-select>
			 
		    </el-form-item>
			<el-form-item label="图片上传" :label-width="formLabelWidth" class="tupian">
		      <el-input auto-complete="off" type="file" name="groupPictureMfile" id="doc" ></el-input>
		     <div style="position: absolute;top: 0;left: 0;z-index: -1;">
			  	<div id="localImag" style="height: 150px;width: 150px;">
			  		<div class="localImg1"></div>
			  		<div class="localImg2"></div>
			  	</div>
			 	<img id="preview"  style="display: none;"/>
			 </div>
		    </el-form-item>
			
		    <el-form-item label="活动名称" :label-width="formLabelWidth">
		      <el-input v-model="form.name" auto-complete="off" name="groupName" ></el-input>
		    </el-form-item>
		    <el-form-item label="活动介绍" :label-width="formLabelWidth" >
		      <el-input v-model="form.introduce" auto-complete="off" class="paty"  type="textarea" name="groupIntroduce"></el-input>
		    </el-form-item>
		    <el-form-item label="活动地点" :label-width="formLabelWidth">
		      <el-input v-model="form.place" auto-complete="off" name="groupLocation"></el-input>
		    </el-form-item>
		    <el-form-item label="活动费用" :label-width="formLabelWidth">
		      <el-input v-model="form.groupAverageCost" auto-complete="off" ></el-input>
		    </el-form-item>
		     <el-form-item label="活动经度" :label-width="formLabelWidth">
		      <el-input v-model="form.groupLongitude" auto-complete="off" name="groupLongitude"></el-input>
		    </el-form-item>
		     <el-form-item label="活动纬度" :label-width="formLabelWidth">
		      <el-input v-model="form.groupLatitude" auto-complete="off" name="groupLatitude"></el-input>
		    </el-form-item>
		     <el-form-item label="活动标签" :label-width="formLabelWidth" class="display">
		      <el-input v-model="form.labelID" auto-complete="off" name="labelID" ></el-input>
		    </el-form-item>
		      <el-form-item label="开始时间" :label-width="formLabelWidth" class="display">
		      <el-input  v-model="form.startTime" auto-complete="off"  name="starttime" id="startTime" ></el-input>
		    </el-form-item>
		      <el-form-item label="结束时间" :label-width="formLabelWidth" class="display">
		      <el-input v-model="form.endTime" auto-complete="off" name="endtime" id="endTime"></el-input>
		    </el-form-item>
		  </el-form>
		  <div slot="footer" class="dialog-footer">
		    <el-button @click="closeActivitieMethod">取 消</el-button>
		  	<el-button @click="ActivitieMethod" type="primary">确认</el-button>
		  </div>
		</el-dialog>
		<!--活动修改列表-->
		<el-dialog title="修改活动资料" v-model="dialogFormVisible2">
			 <p >温馨提示：若时间无法显示请刷新</p>
		  <el-form :model="form2"  enctype="multipart/form-data" id="formdata2">
		  	  <el-form-item label="开始时间" :label-width="formLabelWidth" >
	         <el-date-picker 
	          :editable="false"
	          v-model="form2.startTime"
		      type="datetime" 
		      placeholder="选择日期时间" @change="dateChange2">
		    </el-date-picker>
		    </el-form-item>
		     <el-form-item label="结束时间" :label-width="formLabelWidth">
		    <el-date-picker
		      :editable="false"
		      v-model="form2.endTime"
		      type="datetime"
		      placeholder="选择日期时间" @change="dateChange3">
		    </el-date-picker>
		    </el-form-item>
		  	<el-form-item label="活动类型" :label-width="formLabelWidth">
			  <el-select v-model="form2.labelID" clearable placeholder="请选择" @change="changevalue">
			    <el-option v-for="item in label" :label="item.labelname" :value="item.labelid"  :key="item.labelid">
			      <span style="float: left">{{ item.labelname }}</span>
     			  <span style="float: right; color: #8492a6; font-size: 13px">{{ item.labelid }}</span>
			    </el-option>
			  </el-select>
		    </el-form-item>
		  	<el-form-item label="开始时间" :label-width="formLabelWidth" class="display">
		      <el-input  v-model="form2.dateMark1" auto-complete="off"  name="beginTime" id="startTime1">
		      </el-input>
		   </el-form-item>
		    <el-form-item label="结束时间" :label-width="formLabelWidth" class="display">
		      <el-input v-model="form2.dateMark2" auto-complete="off" name="overTime" id="endTime1"></el-input>
		    </el-form-item>
		   		<el-form-item label="图片上传" :label-width="formLabelWidth" class="tupian">
		      <el-input auto-complete="off" type="file" name="groupPictureMfile" id="doc" ></el-input>
		     <div style="position: absolute;top: 0;left: 0;z-index: -1;">
			  	<div id="localImag" style="height: 150px;width: 150px;">
			  		<div class="localImg1"></div>
			  		<div class="localImg2"></div>
			  	</div>
			 	<img id="preview"  style="display: none;"/>
			 </div>
		    </el-form-item>
		    <el-form-item label="活动名称" :label-width="formLabelWidth">
		      <el-input v-model="form2.groupName" auto-complete="off" name="groupName"></el-input>
		    </el-form-item>
		    <el-form-item label="活动介绍" :label-width="formLabelWidth" >
		      <el-input v-model="form2.groupIntroduce" auto-complete="off" class="a"  type="textarea" name="groupIntroduce"></el-input>
		    </el-form-item>
		    <el-form-item label="活动地点" :label-width="formLabelWidth">
		      <el-input v-model="form2.groupLocation" auto-complete="off" name="groupLocation"></el-input>
		    </el-form-item>
		    <el-form-item label="活动费用" :label-width="formLabelWidth">
		      <el-input v-model="form2. groupLimit" auto-complete="off" name="groupAverageCost"></el-input>
		    </el-form-item>
		    <el-form-item label="活动经度" :label-width="formLabelWidth">
		      <el-input v-model="form2.groupLongitude" auto-complete="off" name="groupLongitude"></el-input>
		    </el-form-item>
		    <el-form-item label="活动纬度" :label-width="formLabelWidth">
		      <el-input v-model="form2.groupLatitude" auto-complete="off" name="groupLatitude"></el-input>
		    </el-form-item>
		    <el-form-item label="活动标签" :label-width="formLabelWidth" class="display">
		      <el-input v-model="form2.labelID" auto-complete="off" name="labelID"  ></el-input>
		    </el-form-item>
		      <el-form-item label="userId" :label-width="formLabelWidth" class="display">
		      <el-input v-model="form2.dateMark3" auto-complete="off" name="userId"  ></el-input>
		    </el-form-item>
		      <el-form-item label="groupId" :label-width="formLabelWidth" class="display">
		      <el-input v-model="form2.groupID" auto-complete="off" name="groupId"  ></el-input>
		    </el-form-item>
		  </el-form>
		  <div slot="footer" class="dialog-footer">
		    <el-button @click="closeActivitieMethod">取 消</el-button>
		  	<el-button @click="EditMethod2" type="primary">确认</el-button>
		  </div>
		</el-dialog>
		<!--活动成员弹框-->
			<el-dialog title="成员操作" v-model="isEdit" >
				<el-form :model="editItem">
					<el-form-item label="群ID" :label-width="formLabelWidth">
						<el-input auto-complete="off" :disabled="true" v-model="editItem.groupID"></el-input>
					</el-form-item>
					<template>
					  <el-table :data="tableData3" height="300" border style="width: 100%">
					  	 <el-table-column  prop="userName"  label="群头像" >
						    <template scope="scope">
						        <img style="height: 100px;width: 110px;margin-top: 10px;"   :src="scope.row.imagePath" alt="" />
						    </template>
					     </el-table-column>
					    <el-table-column prop="userID" label="用户id" >
					    </el-table-column>
					    <el-table-column prop="type" label="成员状态"  >
					    </el-table-column>
					    <el-table-column  prop="userName"  label="用户名">
					    </el-table-column>
					      <el-table-column    label="群主委托">
					      	<template scope="scope">
								 <el-button type="warning" @click="entrustGroup(scope.$index)">委托</el-button>
							</template>
					    </el-table-column>
					      <el-table-column label="群主踢人">
					      		<template scope="scope">
								 <el-button type="danger" @click="deleteGroupNumber(scope.$index)">踢人</el-button>
							</template>
					    </el-table-column>
					  </el-table>
					</template>
				</el-form>
				<div slot="footer" class="dialog-footer">
					<el-button type="primary" @click="exitGroup">退出活动</el-button>
					<el-button @click="closeActivitieMethod">关闭</el-button>
				</div>
			</el-dialog>
		</div>
	</div>
</template>


<script>
	import axios from 'axios'
	import qs from 'qs'
	export default{
		data(){
			return{
				tableData3:[],
    			editItem:'',
    			editIndex :'',
    			label:'',
    			dialogTableVisible: false,
       			dialogFormVisible: false,
       			dialogFormVisible2: false,
       			//input统一宽度
       			formLabelWidth: '70px',
       			
       			dialogImageUrl: '',
       			
       			dialogVisible: false,
       			//活动成员弹框
       			isEdit:false,
       			
				imageUrl:'',
				//加入的活动列表渲染
			    items: '',
			    //活动创建表单
			    form: {name: '',introduce: '',type:'',startTime:'', endTime:'', place:'', 
			    groupAverageCost:'',groupLongitude:'', groupLatitude:'', labelID:'',
			         startTime1:'', endTime1:'',},
			    //活动修改表单
			    form2:{ groupLabelName:'',groupLocation:'',groupIntroduce:'', groupLimit:'',
			    groupName:'',startTime:'', endTime:'',startTime1:'',
			    endTime1:'',labelID:'',groupLatitude:'',groupLongitude:'',},
			}
		},
		mounted(){
			
		},
	
		created () {
			this.getAllItemsMethod ()
			
		},
		
		methods:{
			dome(){
					//vue异步加载模块，判断JS渲染完毕再获取节点
				  this.$nextTick(function(){
				  	//获取最外层div用于改变boder
            		let axx =document.getElementById("doc");
            		//input
					let aInput = axx.getElementsByTagName("input")[0];
					aInput.setAttribute("accept","image/x-png,image/gif,image/jpeg,image/bmp");
					//img
					let imgObj=document.getElementById("preview");
					
					//div
					let divObj=document.getElementById("localImag")
					
					aInput.onchange=function(){
						if(aInput.files[0]){
						axx.style.border="none"
						divObj.style.display = 'none'
                        imgObj.style.display = 'block';
                        imgObj.style.width = '150px';
                        imgObj.style.height = '150px';    
      					imgObj.src = window.URL.createObjectURL(aInput.files[0]);
						}else{
						divObj.style.display = 'block'
                        imgObj.style.display = 'none';
                        axx.style.border="1px dashed grey"
						}
					}
           		});
			},
		//上传图片显示图片
			chuangjian(){
				  this.form={name: '',introduce: '',type:'',startTime:'', endTime:'', place:'',
				  groupAverageCost:'',groupLongitude:'', groupLatitude:'', labelID:'',
		          startTime1:'', endTime1:'',};
				  this.form2={ groupLabelName:'',groupLocation:'',groupIntroduce:'', 
				  groupLimit:'',groupName:'',startTime:'', endTime:'',startTime1:'',
				  endTime1:'',labelID:'',groupLatitude:'',groupLongitude:'',};
				this.dialogFormVisible=true;
           		this.dome()
			},
		
		getAllItemsMethod () {
		//活动列表渲染
			let data =JSON.parse(sessionStorage.getItem("data"))     
		
			axios.post('/eyed/web/eyedGroup/myGroup.action', qs.stringify({

					userID:303,
					
				}))
				.then((response) => {
					if (response.data.code == '0000') {
						this.items = response.data.result;
						console.log(response.data.result)
					} else {
						console.log('服务器返回值不为：0000，创建失败');
					};
				})
				.catch((error) => {
					console.log(error);
				});
				//标签内容渲染
			axios.post('/eyed/web/label/selectAllLabel.action', qs.stringify({
//					name:data.adminName,
//					token:data.token,
				}))
				
				.then((response) => {
					 this.label = response.data.result
				})
				.catch((error) => {
					console.log(error);
				});
			},
		//统一关闭
	    closeActivitieMethod(){
	      this.dialogFormVisible=false;
	      this.dialogFormVisible2=false;
	      this.isEdit=false;
		  this.form={name: '',introduce: '',type:'',startTime:'', endTime:'', place:'',
		  groupAverageCost:'',groupLongitude:'', groupLatitude:'', labelID:'',
          startTime1:'', endTime1:'',};
		  this.form2={ groupLabelName:'',groupLocation:'',groupIntroduce:'', 
		  groupLimit:'',groupName:'',startTime:'', endTime:'',startTime1:'',
		  endTime1:'',labelID:'',groupLatitude:'',groupLongitude:'',};
		   
	      },
	     //群主退群
	     exitGroup(){
	      this.$confirm('此操作将退出此活动, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
          }).then(() => {
            	axios.post('/eyed/web/eyedGroup/exitGroup.action', qs.stringify({
					groupID:this.editItem.groupID,
					userID:303,
				}))
				.then((response) => {
					if (response.data.code == '0000') {
						alert("退出成功")
						this.isEdit=false;
						this.getAllItemsMethod ();
					} else {
						alert("自己还是群主，请先委托其他成员，再尝试退出")
					};
				})
				.catch((error) => {
					console.log(error);
				});
        }).catch(() => {
         
        });
	    },
	     //群主踢人
	      deleteGroupNumber(index){
	      this.$confirm('此操作将踢掉此成员, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
          }).then(() => {
            	axios.post('/eyed/web/eyedGroup/deleteGroupNumber.action', qs.stringify({
					groupID:this.editItem.groupID,
					myUserID:303,
					groupNumberID:this.tableData3[index].userID
				}))
				.then((response) => {
					if (response.data.code == '0000') {
						this.searchGroupNumber(this.editIndex)
					} else {
						console.log('服务器返回值不为：0000，踢人失败');
					};
				})
				.catch((error) => {
					console.log(error);
				});
        }).catch(() => {
         
        });
	      },
	      //群委托
	      entrustGroup(index){
	      console.log("a")
	      this.$confirm('此操作将活动委托给指定成员, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
          }).then(() => {
            	axios.post('/eyed/web/eyedGroup/entrustGroup.action', qs.stringify({
					groupID:this.editItem.groupID,
					userID:303,
					groupNumberID:this.tableData3[index].userID
				}))
				.then((response) => {
					if (response.data.code == '0000') {
						this.searchGroupNumber(this.editIndex)
					} else {
						console.log('服务器返回值不为：0000，委托失败');
					};
				})
				.catch((error) => {
					console.log(error);
				});
        }).catch(() => {
         
        });
	      },
	      
	      //群创建
	      ActivitieMethod(){
	     	 var data = new FormData(document.getElementById("formdata")); 
	     	 axios({
	     	 	method:'post',
	     	 	url:'/eyed/web/eyedGroup/createGroup.action',
	     	 	data:data,
	     	 	contentType: false,
	     	 	cache: false,
	     	 }).then((response)=>{
	     	 		if (response.data.code == '0000') {
	     	 			this.getAllItemsMethod ()
						console.log(response.data.result)
						
					} else {
						console.log('服务器返回值不为：0000，创建失败');
					};
	     	 })
	     	 	.catch((error) => {
					console.log(error);
				});

			  this.dialogFormVisible=false;
			  	 this.form={
		      	 name: '',
		         introduce: '',
		         type:'',
		         startTime:'',
		         endTime:'',
		         place:'',
		         cost:'',
		         groupLongitude:'',
				 groupLatitude:'',
				 labelID:''
	     	};
	     },
      	 //群删除
      	 deleteItemMethod(item){
      	 	let items = item
      	 	console.log(items.groupID)
      	 	this.$confirm('此操作将解散该活动, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
          }).then(() => {
            	axios.post('/eyed/web/eyedGroup/mainGroupDeleteGroup.action', qs.stringify({
					groupID:items.groupID,
					mainGroupID:303
				}))
				.then((response) => {
					if (response.data.code == '0000') {
						this.getAllItemsMethod ()
						console.log(response.data.result)
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
      		clone (obj) {
				let newObj = {};
				for (let key in obj) {
					let val = obj[key];
					newObj[key] = typeof val === 'object' ? this.clone(val) : val;
				}
				return newObj;
			},
			//群成员
      	searchGroupNumber(index){
      		this.editIndex = index;
      		this.isEdit=true;
      		this.editItem =this.clone(this.items[index]);
			axios.post('/eyed/web/eyedGroup/searchGroupNumber.action', qs.stringify({
					groupID:this.editItem.groupID,
				}))
				.then((response) => {
					if (response.data.code == '0000') {
						this.tableData3 = response.data.result;
						
					} else {
						console.log('服务器返回值不为：0000，查找失败');
					};
				})
				.catch((error) => {
					console.log(error);
				});
			
      	},
      	//element框架的时间日期的值，格式化之后赋值给隐藏的input值中
      	dateChange(val){
      		document.getElementById("startTime").children[0].value=val
      	},
      	dateChange1(val){
      		document.getElementById("endTime").children[0].value=val
      	},
      	dateChange2(val){
      	
      	 document.getElementById("startTime1").children[0].value=val
      		
      	},
      	dateChange3(val){
      		
      	 document.getElementById("endTime1").children[0].value=val
      		
      	},
      	//活动详细信息
      	EditDialogMethod(item){
      		
      		let items = item
      		this.dialogFormVisible2=true;
      		this.dome()
      		axios.post('/eyed/web/eyedGroup/selectGroupDetailInformation.action', qs.stringify({
					groupID:items.groupID,
				}))
				.then((response) => {
					if (response.data.code == '0000') {
						this.form2 = response.data.result;
						
						console.log(response.data.result)
				   function a(value){
			       var date = new Date(value);
			       var  y = date.getFullYear(),
			        m = date.getMonth() + 1,
			        d = date.getDate(),
			        h = date.getHours(),
			        i = date.getMinutes(),
			        s = date.getSeconds();
			        if (m < 10) {  m = '0' + m; }
			        if (d < 10) { d = '0' + d; }
			        if (h) {  h= h;}
			        if (i < 10) {  i = '0' + i;}
			        if (s < 10) { s = '0' + s; }
			        var t = y+'-'+m+'-'+d+' '+h+':'+i+':'+s;
			        return t;}
						this.form2.startTime= a(this.form2.startTime)
						this.form2.endTime= a(this.form2.endTime)
						this.form2.dateMark3 = 303
					} else {
						console.log('服务器返回值不为：0000，修改失败');
					};
				})
				.catch((error) => {
					console.log(error);
				});
      	},

		//修改活动
		  EditMethod2(){
		  	 this.dialogFormVisible2=false
	     	 var data = new FormData(document.getElementById("formdata2"));  
	     	 //向data对象添加值
//	     	 data.append('namexxx', 'xixi')
	     	 axios({
	     	 	method:'post',
	     	 	url:'/eyed/web/eyedGroup/updateGroupDetailInformations.action',
	     	 	data:data,
	     	 	contentType: false,
	     	 	cache: false,
	     	 }).then((response)=>{
	     	 		if (response.data.code == '0000') {
	     	 			this.getAllItemsMethod ()
	     	 			
					} else {
						console.log('服务器返回值不为：0000，创建失败');
					};
	     	 })
	     	 	.catch((error) => {
					console.log(error);
				});
	     },
		changevalue(val){
			console.log(val);
			this.form.labelID=val;
//			this.form2.labelID=val
		},
		
	   
		}
	}
	
</script>

<style lang='scss'>
.content{
	display: flex;
	padding-left: 24px;
	flex-wrap: wrap;
}

.creat{
height: 200px;
width: 100px;
button{
	width: 100px;
	display:inline-block;
	margin: 0 auto;
	margin-top:82px;
	border: 1px solid grey;
}
}

 
.img{
	height: 313px;
	width:200px;
	margin-right: 10px;
	
	.imgbox{
		
		overflow: hidden;
		position:relative;
		img{
		height: 200px;
		width: 200px;
	}
	div{
		cursor: pointer;
		position: absolute;
		border: 1px solid red;
		font-size: 12px;
	}
	}
	 p{
	border-radius: 5px;
	border: 1px solid grey;
	height: 30px;
	width: 200px;
	line-height: 30px;
	text-align: center;
	text-overflow : ellipsis; 
	white-space : nowrap; 
	overflow : hidden; 
	margin-bottom: 5px;
	}
	
}
.paty input{
	height: 60px;
}
 
 .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #20a0ff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 150px;
    height: 150px;
    line-height: 150px;
    text-align: center;
  }
  .avatar {
    width: 150px;
    height: 150px;
    display: block;
  }
  .el-dialog{
  	top:6%!important;
  }
  .el-upload__tip{
  	margin: 0;
  	margin-bottom: 10px;
  }
  .dissolve{
  
  	cursor:pointer;
  	background: lightcyan;
  }
  .display{
  	display: none;
  }
  .el-buttonrt{
  	margin-left: 18px!important;
  }
  #doc input{
  	opacity: 0;
  	height: 150px!important;
  	width: 150px!important;
  	cursor:pointer;
  }
  .creatwidth div:nth-child(0){
  	width: 40%;
  }
  .tupian{
  	position: absolute;
  	top: 12.5%;
  	left: 50%;
  }
	#doc{
		border: 1px dashed grey;
		border-radius: 10px;
	}
#doc:hover{
	border-color: dodgerblue;
}

.localImg1{
	width: 70px;
	height: 5px;
	border-radius: 10px;
	background: grey;
	
	position: relative;
	top: 72.5px;
	left: 40px;
}
.localImg2{
	width: 5px;
	height: 70px;
	border-radius: 10px;
	background: grey;
	position: relative;
	top: 34px;
	left: 72.5px;
}
</style>
