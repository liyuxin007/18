/**
 * [提供与android相关的函数]
 *
 * @method  {[func]} appDownLoad	 [下载]
 * @method  {[func]} appContinue	 [继续]
 * @method  {[func]} appStop		 [暂停]
 * @method  {[func]} appWait		 [暂停]
 * @method  {[func]} appInstall		 [安装]
 * @method  {[func]} appOpen		 [打开]
 * @method  {[func]} appCancel		 [取消]
 * @method  {[func]} appUpgrade		 [升级]
 *
 * @method  {[func]} getStateTxt	 [获取android下apk的状态]
 * @method  {[func]} downLoad	 	 [下载传参数给android并统计]
 * @method  {[func]} buildNewWebPage [新建webView页]
 * @method  {[func]} buildDetailPage [新建详情页]
 */
 (function(goo) {

	var android = {

		appDownLoad: function(name) {
			var packname = name.replace(/\./g, "");
			$("." + packname).removeClass("nor continue cancel upgrade install retry").addClass("downing").html("下载中");
		},
		appContinue: function(name) {
			var packname = name.replace(/\./g, "");
			$("." + packname).removeClass("nor continue cancel upgrade install open retry").addClass("downing").html("下载中");

		},
		appStop: function(name) {
			var packname = name.replace(/\./g, "");
			$("." + packname).removeClass("nor downing cancel upgrade install open retry").addClass("continue").html("继续");

		},
		appWait: function(name) {
			var packname = name.replace(/\./g, "");
			$("." + packname).removeClass("nor downing open cancel upgrade install retry").addClass("continue").html("继续");
		},
		appInstall: function(name) {
			var packname = name.replace(/\./g, "");
			$("." + packname).removeClass("nor downing continue open cancel upgrade retry").addClass("install").html("安装");
		},
		appOpen: function(name) {
			var packname = name.replace(/\./g, "");
			$("." + packname).removeClass("nor downing continue cancel upgrade install retry").addClass("open").html("打开");

		},
		appCancel: function(name) {
			var packname = name.replace(/\./g, "");
			$("." + packname).removeClass("downing continue open upgrade install retry").addClass("nor").html("下载");
		},
		appUpgrade: function(name) {
			var packname = name.replace(/\./g, "");
			$("." + packname).removeClass("nor downing continue open cancel install retry").addClass("upgrade").html("升级");
		},
		appRetry: function(name) {
			var packname = name.replace(/\./g, "");
			$("." + packname).removeClass("nor downing continue open cancel install upgrade").addClass("retry").html("重试");
		},

		getStateTxt: function(getState) {
			var stateClass = "",
			stateTxt = "";

			switch(getState) {
				case "waiting":
					stateClass = "downing";
					stateTxt = "下载中";
					break;
				case "downloading":
					stateClass = "downing";
					stateTxt = "下载中";
					break;
				case "resume":
					stateClass = "continue";
					stateTxt = "继续";
					break;
				case "open":
					stateClass = "open";
					stateTxt = "打开";
					break;
				case "install":
					stateClass = "install";
					stateTxt = "安装";
					break;
				case "upgrade":
					stateClass = "upgrade";
					stateTxt = "升级";
				case "download":
					stateClass = "nor";
					stateTxt = "下载";
					break;
				case "failue":
					stateClass = "retry";
					stateTxt = "重试";
					break;
				default:
					stateClass = "nor";
					stateTxt = "下载";
			}

			return {
				"stateClass": stateClass,
				"stateTxt": stateTxt
			}
		},

	

		downLoad: function(self) {
			
	
			var obj =self
				
			var appName = obj.data("appname") || obj.data("apkname"),
				packName = obj.data("packname"),
				icon = obj.data("icon"),
				downurl = obj.data("downurl") || obj.data("filepath"),
				size = obj.data("size") || obj.data("filesize"),
				verCode = obj.data("vercode") || obj.data("versioncode"),
				verName = obj.data("vername") || obj.data("versionname"),
				classCode = "PushSpecialTemp",
				md5 ='',

				source = obj.data("source");
				
			console.log(downurl, appName, packName, icon, verName, verCode, classCode, md5,source, size)
			

			var downApp = function() {
//				window.location.href = downurl;
				
			};

			//hasClass说明现在的状态
			if(obj.hasClass("nor")) {
				//调用java下载
				console.log(1)
				try {
					roid.toDownLoad(downurl, appName, packName, icon, verName, verCode, classCode, md5,source, size);
//					this.appDownLoad(packName);
				} catch (e) {
					try {
						roid.toDownLoad(downurl, appName, packName, icon, verName, verCode, classCode, md5,source, size);
						this.appDownLoad(packName);
					} catch (e) {
						downApp();
					}
				}

			} else if(obj.hasClass("downing")) {
				//调用java暂停
				try {
					roid.toStop(downurl);
					this.appStop(packName);
				} catch (e) {
					downApp();
				}

			} else if(obj.hasClass("continue")) {
				//调用java下载
				try {
					roid.toDownLoad(downurl, appName, packName, icon, verName, verCode, classCode, md5,source, size);
					this.appDownLoad(packName);
				} catch (e) {
					downApp();
				}

			} else if(obj.hasClass("install")) {
				//调用java安装
				try {
					roid.toInstall(packName,downurl);
				} catch (e) {
//					downApp();
				}

			} else if(obj.hasClass("open")) {
				//调用java打开
				try {
					roid.toOpen(packName);
				} catch (e) {
					downApp();
				}

			} else if(obj.hasClass("upgrade")) {
				//调用java升级
				try {
					roid.toDownLoad(downurl, appName, packName, icon, verName);
					this.appDownLoad(packName);
				} catch (e) {
					downApp();
				}

			} else if(obj.hasClass("wait")) {
				//调用java继续
				try {
					roid.toDownLoad(downurl, appName, packName, icon, verName);
					this.appWait(packName);
				} catch (e) {
					downApp();
				}
			} else if(obj.hasClass("retry")) {//重试
				try {
					roid.toResume(packName);
					this.appDownLoad(packName);
				} catch (e) {
					downApp();
				}
			}
			return false;
		},

		//
		buildNewWebPage: function(url, title) {
			try {
				roid.buildNewWebPage(url, title);
			} catch (e) {
				//console.log(title, url);
				window.open(url, "_self");
			}
		},

		//
		buildDetailPage: function(self) {
			var obj =self
				
			var packName = obj.data("packname"),
				classCode = "PushSpecialTemp",
		
				downloadCount = obj.data("downcount")
				source = obj.data("source");
				console.log(source,packName,classCode,downloadCount)
			try {
				roid.buildDetailPage(source,packName,classCode,downloadCount);
			} catch (e) {
				console.log();
			}
		}
	};
	var goo = $.extend(goo, android);

	window.goo = goo;
})(window.goo || {});
