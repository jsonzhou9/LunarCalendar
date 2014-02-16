#LunarCalendar#

农历（阴历）万年历，是一款支持Node.js和浏览器端使用的全功能农历和公历日历类库。支持农历与公历之间相互转换，含有二十四节气，天干地支纪年纪月纪日，生肖属相，公历节假日及农历传统节假日信息等功能。自带2013-2014节假日安排数据，并可自行配置。带有黄历数据，可自行选择配置。支持1891-2100年。使用**LunarCalendar**可快速开发一款属于自己的万年历产品，行动起来吧！

##Install##

1. Node.js服务器端(使用npm安装)：
`npm install lunar-calendar`
2. 浏览器端使用，引用脚本：
`<script type="text/javascript" src="lib/LunarCalendar.min.js"></script>`


##Usage##
###Node.js###
var LunarCalendar = require("lunar-calendar");

###浏览器###
`window.LunarCalendar`是一个全局对象，可以全局作用域直接调用。

##DEMO产品：小推万年历（手机版）##
访问方式：（手机扫描二维码）

![二维码](http://cdn.tuijs.com/upload/1956115939.png)

![小推万年历截图](http://cdn.tuijs.com/upload/calendar_photo.png)

##方法列表##
###LunarCalendar.calendar(year,month[,fill])###
通过公历获取某月农历数据

####参数说明####
- @param {Number} `year` 公历年 范围[1891-2100]
- @param {Number} `month` 公历月 范围[1-12]
- @param {Boolean} `fill`（可选） 是否填充当月日历首尾日期，设为true时，会在首尾填入上下月数据，自动补全一个7*6阵列数据。（可更美观的打造你的万年历产品）

####返回数据####
	{
	    "firstDay": 5, //该月1号星期几（日历开始位置）
	    "monthDays": 28, //该月天数
	    "monthData": [ //本月所有日历数据
	        {
	            "year": 2014, //公历年
	            "month": 2, //公历月
	            "day": 1, //公历日
	            "zodiac": "蛇", //生肖属相
	            "GanZhiYear": "癸巳", //干支纪年
	            "GanZhiMonth": "乙丑", //干支纪月
	            "GanZhiDay": "癸卯", //干支纪日
	            "worktime": 2, //0无特殊安排，1工作，2放假
	            "lunarYear": 2014, //农历年
	            "lunarMonth": 1, //农历月（1-13，有闰月情况，比如当前闰9月，10表示闰9月，11表示10月）
	            "lunarDay": 2, //农历日
	            "lunarMonthName": "正月", //农历月中文名
	            "lunarDayName": "初二", //农历日中文名
	            "lunarLeapMonth": 9, //农历闰月所在月份，0表示无闰月
				"solarFestival": "", //公历节假日，undefined或‘劳动节’之类
				"lunarFestival": "", //农历节假日，undefined或‘除夕’之类
				"term": "" //二十四节气名，undefined或‘立春’之类
	        },
			...
	    ]
	}

###LunarCalendar.solarCalendar(year,month[,fill])###
获取公历某月日历数据（不带农历信息）

####参数说明####
- @param {Number} `year` 公历年 范围[1-~]公元后
- @param {Number} `month` 公历月 范围[1-12]
- @param {Boolean} `fill`（可选） 是否填充当月日历首尾日期，设为true时，会在首尾填入上下月数据，自动补全一个7*6阵列数据。（可更美观的打造你的万年历产品）

####返回数据####
	{
	    "firstDay": 5, //该月1号星期几（日历开始位置）
	    "monthDays": 28, //该月天数
	    "monthData": [ //本月所有日历数据
	        {
	            "year": 2014, //公历年
	            "month": 2, //公历月
	            "day": 1 //公历日
	        },
			...
	    ]
	}

###LunarCalendar.solarToLunar(year,month,day)###
将公历转换为农历

####参数说明####
- @param {Number} `year` 公历年 范围[1891-2100]
- @param {Number} `month` 公历月 范围[1-12]
- @param {Number} `day` 公历日 范围[1-31]

####返回数据####
	{
	    "zodiac": "蛇", //生肖属相
	    "GanZhiYear": "癸巳", //干支纪年
	    "GanZhiMonth": "乙丑", //干支纪月
	    "GanZhiDay": "癸卯", //干支纪日
	    "worktime": 2, //0无特殊安排，1工作，2放假
	    "lunarYear": 2014, //农历年
	    "lunarMonth": 1, //农历月（1-13，有闰月情况，比如当前闰9月，10表示闰9月，11表示10月）
	    "lunarDay": 2, //农历日
	    "lunarMonthName": "正月", //农历月中文名
	    "lunarDayName": "初二", //农历日中文名
	    "lunarLeapMonth": 9, //农历闰月所在月份，0表示无闰月
		"solarFestival": "", //公历节假日，undefined或‘劳动节’之类
		"lunarFestival": "", //农历节假日，undefined或‘除夕’之类
		"term": "" //二十四节气名，undefined或‘立春’之类
	}

###LunarCalendar.lunarToSolar(year,month,day)###
将农历转换为公历

####参数说明####
- @param {Number} `year` 农历年 范围[1891-2100]
- @param {Number} `month` 农历月 范围[1-13]（有闰月情况，比如当前闰9月，10表示闰9月，11表示10月）
- @param {Number} `day` 农历日 范围[1-30]

####返回数据####
	{
	    "year": 2014, //公历年
	    "month": 1, //公历月
	    "day": 31 //公历日
	}

###LunarCalendar.setWorktime(data)###
设置某年的节假日安排信息（类库已内置2013-2014年的数据）

####参数说明####
- @param {Object} `data` 节假日安排信息(以年为key，可设置多年)
- 0：无特殊安排，1：工作，2：放假

**参数data格式如下：**

	{
	    "y2014": {
	        "d0101": 2,
	        "d0126": 1,
	        "d0131": 2,
	        "d0201": 2,
	        "d0202": 2,
	        "d0203": 2,
	        "d0204": 2,
	        "d0205": 2,
	        "d0206": 2,
	        "d0208": 1,
	        "d0405": 2,
	        "d0407": 2,
	        "d0501": 2,
	        "d0502": 2,
	        "d0503": 2,
	        "d0504": 1,
	        "d0602": 2,
	        "d0908": 2,
	        "d0928": 1,
	        "d1001": 2,
	        "d1002": 2,
	        "d1003": 2,
	        "d1004": 2,
	        "d1005": 2,
	        "d1006": 2,
	        "d1007": 2,
	        "d1011": 1
	    }
	}

##黄历数据##
在目录/hl/下有2008-2020年的黄历数据，用户可自行选择在自己万年历中进行添加。

##公用服务器API##
用Node.js搭载lunar-calendar类库。

- API:http://api.tuijs.com/
- 请求类型：GET
- 返回数据：JSON 或 JSONP
- JSONP：支持，添加参数callback（仅支持数字，字母，下划线）

###API列表###

- 通过公历获取某月农历数据 http://api.tuijs.com/calendar
- 获取公历某月日历数据（不带农历信息）http://api.tuijs.com/solarCalendar
- 将公历转换为农历http://api.tuijs.com/solarToLunar
- 将农历转换为公历http://api.tuijs.com/lunarToSolar

**例如：**

http://api.tuijs.com/lunarToSolar?year=2011&month=1&day=1&callback=fn

返回：
`fn({"year":2011,"month":2,"day":16})`

##其它##
- 项目主页：[http://www.tuijs.com/](http://www.tuijs.com/ "项目主页")
- 作者博客：[http://www.2fz1.com/](http://www.2fz1.com/ "作者博客")

JasonZhou