// 测试用例

var expect = require('expect.js'),
	LunarCalendar = require('../lib/LunarCalendar');

describe('lunar-calendar', function(){
	var solarDate = new Date(2014, 1, 1); //公历2014年2月1日
	var lunarDate = {
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
		"solarFestival": undefined, //公历节假日，undefined或‘劳动节’之类
		"lunarFestival": undefined, //农历节假日，undefined或‘除夕’之类
		"term": undefined //二十四节气名，undefined或‘立春’之类
	};
	
	it('.solarToLunar(year,month,day)，公历转农历', function(){
		var lunar = LunarCalendar.solarToLunar(solarDate.getFullYear(),solarDate.getMonth()+1,solarDate.getDate());
		expect(lunar).to.eql(lunarDate);
	});
});