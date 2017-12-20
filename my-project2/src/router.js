//import App from './App'

import vLogin from './components/login'//登录界面
import vHome from './components/home'//管理首页
import vHomeTow from './views/Home'//管理欢迎首页
import vEyedcode from './views/Eyedcode'//爱的账号管理
import vBlockedList from './views/BlockedList'//黑名单管理
import vEmoticonCommon from './views/EmoticonCommon'//系统表情管理
import vFileUpload from './views/FileUpload'//文件管理
import vFocuserlationShip from './views/FocusrelationShip'//关注关系管理
import vFriendRelationShip from './views/FriendRelationShip'//好友关系管理
import vLabelAbility from './views/LabelAbility'//能力标签管理
import vLabelInterest from './views/LabelInterest'//兴趣标签管理
import vNationalArea from './views/NationalArea'//国家区域管理
import vNickAdj from './views/NickAdj'//昵称形容词管理
import vNickN from './views/NickN'//昵称名词管理
import vPostLabel from './views/PostLabel'//发帖标签管理
import vProblemOfFeedback from './views/ProblemOfFeedback'//APP问题反馈
import vProblemUser from './views/ProblemUser'//举报反馈
import vTradingRecord from './views/TradingRecord'//查询支付流水
import vTransactionType from './views/TransactionType'//交易类型管理
import vUserActivity from './views/UserActivity'//用户活动管理
import vCreateActivitie from './views/CreateActivitie'//创建活动
import vCeShi from './views/ceshi'
import vUsercode from './views/Usercode'//用户信息
import vSystemFacePack from './views/SystemFacePack'
export default [
	{ path: '/', component: vLogin },
	{ 
		path: '/home', 
		component: vHome,
		//默认路由页面
		redirect:'/home/hometow',
		//开启二级路由
		children:[
		{path:'/home/Eyedcode',component: vEyedcode},
		{path:'/home/hometow',component: vHomeTow},
		{path:'/home/BlockedList',component: vBlockedList},
		{path:'/home/EmoticonCommon',component: vEmoticonCommon},
		{path:'/home/FileUpload',component:vFileUpload},
		{path:'/home/FocusrelationShip',component:vFocuserlationShip},
		{path:'/home/FriendRelationShip',component:vFriendRelationShip},
		{path:'/home/LabelAbility',component: vLabelAbility},
		{path:'/home/LabelInterest',component: vLabelInterest},
		{path:'/home/NationalArea',component: vNationalArea},
		{path:'/home/NickAdj',component: vNickAdj},
		{path:'/home/NickN',component: vNickN},
		{path:'/home/PostLabel',component: vPostLabel},
		{path:'/home/ProblemOfFeedback',component: vProblemOfFeedback},
		{path:'/home/ProblemUser',component: vProblemUser},
		{path:'/home/TradingRecord',component: vTradingRecord},
		{path:'/home/TransactionType',component: vTransactionType},
		{path:'/home/UserActivity',component: vUserActivity},
		{path:'/home/CreateActivitie',component: vCreateActivitie},
		{path:'/home/CeShi',component: vCeShi},
		{path:'/home/Usercode',component: vUsercode},
		{path:'/home/SystemFacePack',component: vSystemFacePack},
		]
	},

]
