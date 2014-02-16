module.exports = function(grunt) {
	//Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		uglify: {
			options: {
				banner: '/**\n * 农历（阴历）万年历\n * LunarCalendar；NPM NAME:<%= pkg.name %>\n * vervison : v<%= pkg.version %>\n * Github : https://github.com/zzyss86/LunarCalendar\n * HomePage : http://www.tuijs.com/\n * Author : JasonZhou\n * Email : zzyss86@qq.com\n */\n'
			},
			build: {
				src: 'lib/LunarCalendar.js',
				dest: 'lib/LunarCalendar.min.js'
			},
			buildhl: {
				 expand: true,
                 cwd: 'hl/',
                 src: '**/*.js',
                 dest: 'hl_build/',
                 ext: '.min.js'
			},
			buildDemo: {
				src: 'demo/calendar/js/calendar.js',
				dest: 'demo/calendar/js/calendar.min.js'
			}
		},
		cssmin: {
			options: {
				keepSpecialComments: 0
			},
			compress: {
				files:{
					'demo/calendar/style.min.css' : ['demo/calendar/style.css']
				}
			}
		}
	});

	// 加载包含 "uglify" 任务的插件。
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-cssmin');

	// 默认被执行的任务列表。
	grunt.registerTask('default', ['uglify']);
	grunt.registerTask('hl', ['uglify:buildhl']);
	grunt.registerTask('demo', ['cssmin']);
};