<template>
	<div class="usermanagement">
		<div class="breadcrumb">
		    <el-breadcrumb separator="/" >
		        <el-breadcrumb-item to="/home">首页</el-breadcrumb-item>
		        <el-breadcrumb-item>系统表情管理</el-breadcrumb-item>
		    </el-breadcrumb>
		</div>
		<div class="article">
			<h2>系统表情管理</h2>
			<div class="edit">
				<el-form label-width="120px" :model="searchItem" onsubmit="return false;">
					<el-form-item label="表情包名称">
						<el-input placeholder="表情包名称"  v-model="searchItem.likeName"></el-input>
					</el-form-item>
					<el-form-item class="sysTemButton">
						<el-button type="primary" >搜索</el-button>
						<el-button type="info" :plain="true" @click="openIsAdd">添加</el-button>
					</el-form-item>
				</el-form>
			</div>
			<div class="table">
				<el-table border style="width: 100%" height="550" :data="allItems">
					<el-table-column prop="emoj_path" label="表情包">
						<template scope="scope">
						        <img style="height: 110px;width: 120px;margin-top: 10px;"   :src="scope.row.emoj_path" alt="" />
						</template>
					</el-table-column>
					<el-table-column prop="emoj_assort" label="表情名称"></el-table-column>
					<el-table-column label="编辑" width="200">
						<template scope="scope">
							<el-button type="text" @click="openEditDialogMethod(scope.$index)">查看 &amp; 编辑</el-button>
						</template>
					</el-table-column>
					<el-table-column label="编辑" width="200">
						<template scope="scope">
							<el-button type="text" @click="deleteSystem(scope.$index)">删除表情包</el-button>
						</template>
					</el-table-column>
				</el-table>
			</div>
		</div>
			<el-dialog title="查看 & 编辑" v-model="isEdit">
				
					<el-table border style="width: 100%" height="440" :data="tableData">
							<el-table-column prop="emojPath" label="表情包图片" >
								<template scope="scope">
								        <img style="height: 110px;width: 120px;"   :src="scope.row.emojPath" alt="" />
								</template>
							</el-table-column>
							<el-table-column prop="emojCode" label="表情缩略码">
								<el-input placeholder="表情包名称"  ></el-input>
							</el-table-column>
							<el-table-column prop="emojName" label="表情名称"></el-table-column>
							<el-table-column label="编辑" width="100">
							<template scope="scope">	
							<el-button type="text" @click="editorSys(scope.$index)">编辑</el-button>
							</template>
							</el-table-column>
							<el-table-column label="删除" width="100">
							<template scope="scope">	
							<el-button type="text" @click="deleteSystemFace(scope.$index)">删除</el-button>
							</template>
							</el-table-column>
					</el-table>
			</el-dialog>
			<el-dialog title="添加表情包" v-model="isAdd">
			  <div>
				<el-form ref="form" :model="form" label-width="100px" id="form_data">
				  <el-form-item label="表情包名称">
				    <el-input v-model="form.name" style="width: 200px;" name="emojAssort" @blur="filter" onsubmit="return false;" placeholder="只能输入中文和英文字母"></el-input>
				  </el-form-item>
				  <el-form-item label="图片">
				    <input type="file"   name="multipartFiles" multiple="multiple" accept="image/x-png,image/gif,image/jpeg,image/bmp"/>
				  </el-form-item>
				  <el-form-item>
				    <el-button type="primary" @click="onSubmit">立即创建</el-button>
				    <el-button @click="closeIsAdd">取消</el-button>
				  </el-form-item>
				</el-form>
			</div>
			</el-dialog>
			
			<el-dialog title="表情编辑" v-model="isEditor">
				<el-form :model="sysTem">	
					<el-form-item label="表情缩略码">
						<el-input placeholder="表情缩略码"  v-model="sysTem.emojCode"></el-input>
					</el-form-item>
					<el-form-item label="表情名称">
						<el-input placeholder="表情名称"  v-model="sysTem.emojName"></el-input>
					</el-form-item>
				<el-form-item >
						<el-button type="primary" @click="change">确定修改</el-button>
				</el-form-item>
				</el-form>
			
			</el-dialog>
	</div>
</template>
<script>
	import axios from 'axios'
	import qs from 'qs'

	export default {
		data () {
			return {
				isEditor:false,
				isEdit: false,
				isAdd:false,
				sysIndex:'',
				tableData:[{
					emojPath:'获取数据中',
					emojCode:'获取数据中',
					emojAssort:'获取数据中'
				}],
				sysTem:{},
				// 搜索输入框 v-model 初始值
				searchItem: {
					likeID: '',
				},
				// 表格数据
				allItems: [{
					emoj_path: '获取数据中',
					emoj_assort: '获取数据中',
					emojCode: '获取数据中',
				}],
				formLabelWidth: '120px',
				form: {}
			};
		},
		
		       
		created () {
			// 路由导航完成后，获取 allItems
			this.getAllItemsMethod();
		},
	
		methods: {
			//获取所有表情包
		getAllItemsMethod(){
			axios.post('eyed/web/emoji/loadEmojPackage.action')
			.then((response)=>{
				this.allItems = response.data.result;
				console.log(response.data.result)
			})
			.catch((error)=>{
				console.log(error);
			})
		},
		//查看表情包详情
		openEditDialogMethod(i){
			this.sysIndex=i;
			this.isEdit=true
			axios.post('/eyed/web/emoji/selectByAssort.action',qs.stringify({
				assort:this.allItems[i].emoj_assort
			}))
			.then((response)=>{
				this.tableData = response.data.result;
				console.log(response.data.result)
			})
			.catch((error)=>{
				console.log(error);
			})
			  this.$nextTick(function(){
			  	 var dligo=document.getElementsByClassName("el-table__body-wrapper")[1].scrollTop=0;
			  	 console.log(dligo)
			  })
		},
		//表情包集合删除
		deleteSystem(i){
				//删除键弹框
          this.$confirm('此操作将删除该表情包, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
          }).then(() => {
          	//确定执行
        	axios.post('/eyed/web/emoji/deleteAssort.action',qs.stringify({
				assort:this.allItems[i].emoj_assort
				
			}))
			.then((response)=>{
				this.getAllItemsMethod();
			})
			.catch((error)=>{
				console.log(error);
			})

        }).catch(() => {

        });
			
		},
		//表情包单文件删除
		deleteSystemFace(i){
						//删除键弹框
          this.$confirm('此操作将删除该表情, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          closeOnClickModal:true
          }).then(() => {
          	//确定执行
        	console.log(this.tableData[i].emojId)
			axios.post('/eyed/web/emoji/delete.action',qs.stringify({
			emojId:this.tableData[i].emojId
			}))
			.then((response)=>{
				this.openEditDialogMethod(this.sysIndex)
			})
			.catch((error)=>{
				console.log(error);
			})

        }).catch(() => {

        });
			
			
			
			
			
			
		},
	
		openIsAdd(){
			this.isAdd=true
		},
		closeIsAdd(){
			this.isAdd=false
		},
		
		editorSys(i){
			this.isEditor=true
			console.log(i)
			this.sysTem=this.tableData[i]
		},
		change(){
			axios.post('/eyed/web/emoji/modify.action',qs.stringify({
			emojId:this.sysTem.emojId,
			emojName:this.sysTem.emojName,
			emojCode:this.sysTem.emojCode
			}))
			.then((response)=>{
				this.openEditDialogMethod(this.sysIndex)
				alert("修改成功")
				this.isEditor=false
			})
			.catch((error)=>{
				console.log(error);
			})
		},
		//添加表情包
		onSubmit() {
          	 var data = new FormData(document.getElementById("form_data")); 
	     	 axios({
	     	 	method:'post',
	     	 	url:'/eyed/web/emoji/addDemojBatch.action',
	     	 	data:data,
	     	 	contentType: false,
	     	 	cache: false,
	     	 }).then((response)=>{
	     	 		if (response.data.code == '0000') {
	     	 		this.getAllItemsMethod();
						console.log(response.data.result)
						
					} else {
						console.log('服务器返回值不为：0000，创建失败');
					};
	     	 })
	     	 	.catch((error) => {
					console.log(error);
				});


      },
      //失去焦点触发过滤赋值输入框
      filter(){
//  		this.form.name =this.filterStr(this.form.name)
    		this.checkval(this.form.name)
      },
      //过滤输入框的值
      filterStr(str){    
        var pattern = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？%+_]");    
        var specialStr = "";    
        for(var i=0;i<str.length;i++)    
        {    
             specialStr += str.substr(i, 1).replace(pattern, '');     
        }    
        return specialStr;    
    },
     checkval(t) {
    var re = /^[\u4e00-\u9fa5a-z]+$/gi;//只能输入汉字和英文字母
    if(t){
    	if (re.test(t)) {
        return true;
    } else {
    	alert("含有特殊字符")
        return false;
    }
    }
    
		},
	},	
		
	};
</script>
<style>
	.sysTemButton{
		position: absolute;
		top: 195px;
		left: 570px;
	}
	.sysQuery{
		margin-left: 20px;
		position: absolute;
		top: 71px;
		right: 100px;
	}
</style>