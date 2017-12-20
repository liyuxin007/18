
function _getluhm(str) {
    var newArr = new Array();
    for (var i = str.length - 1; i > -1; i--) {    //前14
        newArr.push(str.substr(i, 1));
    }
    var arrJiShu = new Array();  //奇数位*2的积 <9
    var arrJiShu2 = new Array(); //奇数位*2的积 >9

    var arrOuShu = new Array();  //偶数位数组
    for (var j = 0; j < newArr.length; j++) {
        if ((j + 1) % 2 == 1) {//奇数位
            if (parseInt(newArr[j]) * 2 < 9)
                arrJiShu.push(parseInt(newArr[j]) * 2);
            else
                arrJiShu2.push(parseInt(newArr[j]) * 2);
        }
        else //偶数位
            arrOuShu.push(newArr[j]);
    }

    var jishu_child1 = new Array();//奇数位*2 >9 的分割之后的数组个位数
    var jishu_child2 = new Array();//奇数位*2 >9 的分割之后的数组十位数
    for (var h = 0; h < arrJiShu2.length; h++) {
        jishu_child1.push(parseInt(arrJiShu2[h]) % 10);
        jishu_child2.push(parseInt(arrJiShu2[h]) / 10);
    }

    var sumJiShu = 0; //奇数位*2 < 9 的数组之和
    var sumOuShu = 0; //偶数位数组之和
    var sumJiShuChild1 = 0; //奇数位*2 >9 的分割之后的数组个位数之和
    var sumJiShuChild2 = 0; //奇数位*2 >9 的分割之后的数组十位数之和
    var sumTotal = 0;
    for (var m = 0; m < arrJiShu.length; m++) {
        sumJiShu = sumJiShu + parseInt(arrJiShu[m]);
    }

    for (var n = 0; n < arrOuShu.length; n++) {
        sumOuShu = sumOuShu + parseInt(arrOuShu[n]);
    }

    for (var p = 0; p < jishu_child1.length; p++) {
        sumJiShuChild1 = sumJiShuChild1 + parseInt(jishu_child1[p]);
        sumJiShuChild2 = sumJiShuChild2 + parseInt(jishu_child2[p]);
    }
    //计算总和
    sumTotal = parseInt(sumJiShu) + parseInt(sumOuShu) + parseInt(sumJiShuChild1) + parseInt(sumJiShuChild2);

    //计算Luhm值
    var k = parseInt(sumTotal) % 10 == 0 ? 10 : parseInt(sumTotal) % 10;
    var luhm = 10 - k;
    return luhm;
}
function _getRandomNum(min, max) {
    var Range = max - min;
    var Rand = Math.random();
    return (min + Math.round(Rand * Range));
}
function _getRandomImei() {
    try {
        var storage = window.localStorage;
        var randomImei = storage.getItem("randomImei");
        if (randomImei) {
            return randomImei;
        }
        var ImeiTac = "86";
        randomImei = ImeiTac + _getRandomNum(111111111110, 999999999999);
        randomImei += _getluhm(randomImei);
        storage.setItem("randomImei", randomImei);
        return randomImei;
    } catch (ex) {
        return "000000000000000";
    }
}



//function _getQueryString(name) {
//  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
//  var r = window.location.search.substr(1).match(reg);
//  if (r != null) return unescape(r[2]); return null;
//}
//(function () {
//  if (!_getQueryString("imei")) {
//      window.location.href = window.location.href + "&imei=" + _getRandomImei();
//  }
