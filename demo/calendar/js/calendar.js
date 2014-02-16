window.HuangLi = window.HuangLi || {};

(function () {
    var mobile = {
        platform: '',
        version: 0,
        Android: function () {
            return this.platform === 'Android';
        },
        iOS: function () {
            return this.platform === 'iOS';
        },
        init: function () {
            var ua = navigator.userAgent;
            if (ua.match(/Android/i)) {
                this.platform = 'Android';
                this.version = parseFloat(ua.slice(ua.indexOf("Android") + 8));
            }
            else if (ua.match(/iPhone|iPad|iPod/i)) {
                this.platform = 'iOS';
                this.version = parseFloat(ua.slice(ua.indexOf("OS") + 3));
            }
        }
    };
    mobile.init();
    this.mobile = mobile;
} ());

(function() {
    /**
     * 动态加载js文件
     * @param  {string}   url      js文件的url地址
     * @param  {Function} callback 加载完成后的回调函数
     */
    var _getScript = function(url, callback) {
        var head = document.getElementsByTagName('head')[0],
            js = document.createElement('script');

        js.setAttribute('type', 'text/javascript'); 
        js.setAttribute('src', url); 

        head.appendChild(js);

        //执行回调
        var callbackFn = function(){
			if(typeof callback === 'function'){
				callback();
			}
        };

        if (document.all) { //IE
            js.onreadystatechange = function() {
                if (js.readyState == 'loaded' || js.readyState == 'complete') {
                    callbackFn();
                }
            }
        } else {
            js.onload = function() {
                callbackFn();
            }
        }
    }

    //如果使用的是zepto，就添加扩展函数
    if(Zepto){
        $.getScript = _getScript;
    }
})();


(function () {
    var Footprint = function () {};
      // Default template settings, uses ASP/PHP/JSP delimiters, change the
      // following template settings to use alternative delimiters.
    var templateSettings = {
        evaluate : /<%([\s\S]+?)%>/g,
        interpolate : /<%=([\s\S]+?)%>/g
    };

      // JavaScript micro-templating, similar to John Resig's implementation.
      // Underscore templating handles arbitrary delimiters, preserves whitespace,
      // and correctly escapes quotes within interpolated code.
    Footprint.compile = function(str, settings) {
        var c = settings || templateSettings;
        var tmpl = 'var __p=[],print=function(){__p.push.apply(__p,arguments);};' +
          'with(obj||{}){__p.push(\'' +
          str.replace(/\\/g, '\\\\')
             .replace(/'/g, "\\'")
             .replace(c.interpolate, function(match, code) {
               return "'," + code.replace(/\\'/g, "'") + ",'";
             })
             .replace(c.evaluate || null, function(match, code) {
               return "');" + code.replace(/\\'/g, "'")
                                  .replace(/[\r\n\t]/g, ' ') + "__p.push('";
             })
             .replace(/\r/g, '\\r')
             .replace(/\n/g, '\\n')
             .replace(/\t/g, '\\t')
             + "');}return __p.join('');";
        return new Function('obj', tmpl);
    };

    // Preserves template method for compatible with legacy call.
    Footprint.template = function (str, data) {
        var compilied = Footprint.compile(str);
        return compilied(data);
    };
  
    if (typeof exports !== "undefined") {
        exports.Footprint = Footprint;
    } else {
        window.Footprint = Footprint;
    }
	
	//如果使用的是zepto，就添加扩展函数
    if(Zepto){
        $.template = Footprint.template;
    }
}());

var Calendar = (function(){
	var hlurl = 'http://cdn.tuijs.com/js/';
	var hlMinYear = 2008;
	var hlMaxYear = 2020;
	var minYear = 1891;//最小年限
	var maxYear = 2100;//最大年限
	var itemTemp = [
		'<div class="date_item<%=itemCls%>" data-index="<%=index%>">',
		'	<span class="date_icon<%=iconCls%>"><%=iconText%></span>',
		'	<span class="date_day"><%=day%></span>',
		'	<span class="date_lunar<%=fetvCls%>"><%=lunar%></span>',
		'</div>'
	];
	
	var now = new Date();
	var current = null;
	var DATA = null;
	var panel = [0,1]; //当前显示面板panel[0]
	var pageWidth = 0; //设备宽度
	var slideIng = false; //是否滑动中
	var timer = -1;
	
	var formateDayD4 = function(month,day){
		month = month+1;
		month = month<10 ? '0'+month : month;
		day = day<10 ? '0'+day : day;
		return 'd'+month+day;
	};
	
	function formatDate(){
		if(!current)return '';
		var year = current.year;
		var month = current.month;
		var day = current.day;
		month = month<10 ? '0'+month : month;
		day = day<10 ? '0'+day : day;
		return year+'-'+month+'-'+day;
	};
	
	function setCurrentByNow(year,month,day,pos){
		current = {
			year : year || now.getFullYear(),
			month : month || now.getMonth()+1,
			day : day || now.getDate(),
			pos : pos || 0
		};
	};
	
	//黄历
	function getHL(){
		if(HuangLi['y'+current.year]){ //该年已有黄历数据
			var hl = HuangLi['y'+current.year][formateDayD4(current.month,current.day)];
			showHL(hl);
		}else if(current.year>=hlMinYear && current.year<=hlMaxYear){
			$.getScript(hlurl+'hl'+current.year+'.min.js',function(){
				var hl = HuangLi['y'+current.year][formateDayD4(current.month,current.day)];
				showHL(hl);
			});
		}
	}
	function showHL(hl){
		if(hl){
			$('.hl_y_content').html(hl.y);
			$('.hl_j_content').html(hl.j);
			$('.date_hl').show();
		}else{
			$('.date_hl').hide();
		}
	};
	
	function showInfo(_this){
		var currentLunar = LunarCalendar.solarToLunar(current.year,current.month,current.day);
		var weekday = new Date(current.year,current.month-1,current.day).getDay();
		var weekList = ['日','一','二','三','四','五','六'];
		$('#toolbar h1').html(formatDate());
		$('.date_lunar_info').html('农历'+currentLunar.lunarMonthName+currentLunar.lunarDayName+' 星期'+weekList[weekday]);
		$('.date_gan_zhi').html(currentLunar.GanZhiYear+'年['+currentLunar.zodiac+'年] '+currentLunar.GanZhiMonth+'月 '+currentLunar.GanZhiDay+'日');
		
		var fetv = [];
		if(currentLunar.term) fetv.push(currentLunar.term);
		if(currentLunar.lunarFestival) fetv.push(currentLunar.lunarFestival);
		if(currentLunar.solarFestival) fetv.push(currentLunar.solarFestival.split(' '));
		$('.date_fetv').html(fetv.length>0 ? '节假日纪念日：'+fetv.join('，') : '');
		
		//当前日期
		if(_this){
			_this.attr('class','date_item date_current');
		}
		
		//拉取黄历
		getHL();
	};
	
	//恢复指定日期的状态信息
	function resetInfo(){
		//今天
		var oldObj = $('#date_list_'+panel[0]).find('.date_item').eq(current.pos);
		if(now.getFullYear()==current.year && now.getMonth()+1==current.month && now.getDate()==current.day){
			oldObj.attr('class','date_item date_today');
		}else{
			oldObj.attr('class','date_item');
		}
	};
	
	function showDate(){
		DATA = LunarCalendar.calendar(current.year,current.month,true);
		
		var dateHtml = '';
		var temp = itemTemp.join('');
		
		for(var i=0;i<DATA.monthData.length;i++){
			var itemData = DATA.monthData[i];
			
			if(i%7==0){ //某行第一列
				dateHtml+='<div class="date_row">'
			};
			
			var extendObj = {
				index : i,
				itemCls: '',
				iconCls: itemData.worktime ? (itemData.worktime==1 ? ' worktime' : ' holiday') : '',
				iconText: itemData.worktime ? (itemData.worktime==1 ? '班' : '休') : '',
				fetvCls: (itemData.lunarFestival || itemData.term) ? ' lunar_fetv' : (itemData.solarFestival ? ' solar_fetv' : ''),
				lunar: ''
			};
			
			var itemCls = '';
			if(now.getFullYear()==itemData.year && now.getMonth()+1==itemData.month && now.getDate()==itemData.day){
				itemCls = ' date_today';
			}
			if(current.year==itemData.year && current.month==itemData.month && current.day==itemData.day){ //当前选中
				itemCls = ' date_current';
				current.pos = i;
			}
			if(i<DATA.firstDay || i>=DATA.firstDay+DATA.monthDays){ //非本月日期
				itemCls = ' date_other';
			}
			extendObj.itemCls = itemCls;
			
			var lunar = itemData.lunarDayName;
			//以下判断根据优先级
			if(itemData.solarFestival) lunar = itemData.solarFestival;
			if(itemData.lunarFestival) lunar = itemData.lunarFestival;
			if(itemData.term) lunar = itemData.term;
			extendObj.lunar = lunar;
			
			$.extend(itemData,extendObj);
			
			dateHtml += $.template(temp,itemData);
			
			if(i%7==6){//某行尾列
				dateHtml+='</div>';
			};
		};
		
		$('#date_list_'+panel[0]).html(dateHtml);
		
		showInfo();
	};
	
	//切换月份，可指定
	function pageDate(offset,_year,_month,_day){
		var year,month,day;
		if(_year && _month){ //直接指定
			year = _year;
			month = _month;
		}else{
			if(current.month+offset<1){ //上一年
				year = current.year-1;
				month = 12;
			}else if(current.month+offset>12){ //下一年
				year = current.year+1;
				month = 1;
			}else{
				year = current.year;
				month = current.month+offset;
			}
		}
		day = _day ? _day : (current.day > LunarCalendar.getSolarMonthDays[month-1] ? LunarCalendar.getSolarMonthDays[month-1] : current.day);
		if(year<minYear || year>maxYear)return; //超过范围
		
		setCurrentByNow(year,month,day);
		changePanel();
		showDate();
		
		slide(offset);
	};
	function changePanel(){
		var first = panel.shift();
		panel.push(first);
	};
	//滑动
	function slide(offset){
		timer && clearTimeout(timer);
		setSlidePos({time:0,pos:0});
		$('#date_list_'+panel[0]).css({left:offset * pageWidth}); //将要显示
		$('#date_list_'+panel[1]).css({left:0}); //当前显示
		
		if(offset>0){//左滑
			timer = setTimeout(function(){
				setSlidePos({time:300,pos:pageWidth * -1});
			},50);
		}else{ //右滑
			timer = setTimeout(function(){
				setSlidePos({time:300,pos:pageWidth});
			},50);
		}
	};
	function setSlidePos(opt){
		var slide = $('.date_slide')[0];
		slide.style.webkitTransitionDuration = opt.time+'ms';
		setTranslate(slide,opt.pos);
	};
	function setTranslate(obj,pos){
		if(mobile.platform=='iOS'){//iOS下启用3d加速，安卓下有BUG，使用2d
			obj.style.webkitTransform = 'translate3d('+pos+'px,0px,0px)';
		}else{
			obj.style.webkitTransform = 'translate('+pos+'px,0px)';
		}
	};
	
	function addEvent(){ //base hammer.js
		$('.date_list').hammer().on('tap','.date_item',function(){
			var index = $(this).attr('data-index');
			index = parseInt(index,10);
			var itemData = DATA.monthData[index];
			
			if(index<DATA.firstDay){ //上一个月
				pageDate(-1,itemData.year,itemData.month,itemData.day);
			}else if(index>=DATA.firstDay+DATA.monthDays){//下一个月
				pageDate(1,itemData.year,itemData.month,itemData.day);
			}else{
				resetInfo();
				setCurrentByNow(itemData.year,itemData.month,itemData.day,index);
				showInfo($(this));
			}
		});
		
		$('.today').hammer().on('tap',function(event){
			pageDate(1,now.getFullYear(),now.getMonth()+1,now.getDate());
			return false;
		});
		
		$('.slide_wrap').hammer().on('swipeleft',function(event){
			pageDate(1);
			event.preventDefault();
			event.gesture.preventDefault();
			return false;
		});
		
		$('.slide_wrap').hammer().on('swiperight',function(event){
			pageDate(-1);
			event.preventDefault();
			event.gesture.preventDefault();
			return false;
		});
	};
	
	function initPageElm(){
		pageWidth = $(document).width();
		$('.date_list').eq(0).css('width',pageWidth);
		$('.date_list').eq(1).css({'width':pageWidth,'left':pageWidth});
		if(mobile.platform=='iOS'){//iOS启用3d，同时将子元素也设置一下，防止BUG
			setTranslate(document.getElementById('date_list_0'),0);
			setTranslate(document.getElementById('date_list_1'),0);
		}
	};
	
	function init(){
		initPageElm();
		addEvent();
		setCurrentByNow();
		showDate();
	};
	
	return {
		init : init
	};
})();

$(function(){
	Calendar.init();
});