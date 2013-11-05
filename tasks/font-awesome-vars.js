/**
@fileDescription
Edits the font-awesome variables.less file to set the @fa-font-path variable

@usage
`grunt fontAwesomeVars`		//run all tasks in this multiTask with their defaults / standard config

@param {String} variablesLessPath Path to the variables.less file to edit
@param {String} fontPath Path to set fa-font-path to in variables.less

@toc
0. setup
1. init
*/

module.exports = function(grunt) {
	grunt.registerMultiTask("fontAwesomeVars", "Edit the font-awesome variables.less file", function() {
		/**
		Setup - Pull in grunt config for this task/target and extend from defaults.
		@toc 0.
		*/
		
		/**
		@toc 1.
		@method init
		@param {Object} conf
			@param {String} variablesLessPath Path to the variables.less file to edit
			@param {String} fontPath Path to set fa-font-path to in variables.less
		*/
		function init(conf, params) {
			//read in the file
			var fileContents =grunt.file.read(conf.variablesLessPath);
			
			//the new line to insert
			var newLine ='\n@fa-font-path: "'+conf.fontPath+'";\n';
			
			//find the beginning and end of the LAST (in case there's more than one) line that has '@fa-font-path'
			var newFileContents;
			var index1 =fileContents.lastIndexOf('@fa-font-path');
			if(index1 >-1) {		//if line exists
				var endOfLine =fileContents.indexOf('\n', index1);
				var begOfLine =fileContents.lastIndexOf('\n', index1);
				// newFileContents =fileContents.slice(0, endOfLine)+newLine+fileContents.slice((endOfLine+1), fileContents.length);
				newFileContents =fileContents.slice(0, begOfLine)+newLine+fileContents.slice((endOfLine+1), fileContents.length);
			}
			else {		//if line does NOT exist, just write to end of file
				newFileContents =fileContents+newLine;
			}
			
			//write the new (now edited) file contents back to the original file (thus over-writing it)
			grunt.file.write(conf.variablesLessPath, newFileContents);
			
			//log result
			grunt.log.writeln('Wrote: '+newLine+' to file: '+conf.variablesLessPath);
		}

		init(this.data, {});		//start everything
	});
};