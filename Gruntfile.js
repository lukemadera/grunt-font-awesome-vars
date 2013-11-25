/**
*/

module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({
		jshint: {
			options:{
				force: true
				//globalstrict: true
				//sub:true,
			},
			all: ['Gruntfile.js', 'tasks/**/*.js', 'test/**/*.js']
		},
		fontAwesomeVars: {
			main: {
				variablesLessPath: 'test/variables.less',
				variablesScssPath: 'test/_variables.scss',
				fontPath: '../bower_components/font-awesome/fonts'		//NOTE: this must be relative to FINAL, compiled .css file - NOT the variables.less file! For example, this would be the correct path if the compiled css file is main.css which is in 'src/build' and the font awesome font is in 'src/bower_components/font-awesome/fonts' - since to get from main.css to the fonts directory, you first go back a directory then go into bower_components > font-awesome > fonts.
			}
		}
	});

	// Load plugins
	grunt.loadNpmTasks('grunt-contrib-jshint');
	
	grunt.loadTasks('tasks');		//load our font-awesome-vars plugin

	// Default task(s).
	grunt.registerTask('default', ['jshint', 'fontAwesomeVars']);
};