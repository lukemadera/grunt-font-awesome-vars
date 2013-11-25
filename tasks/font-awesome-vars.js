/**
@fileDescription
Edits the font-awesome variables.less and/or _variables.scss file(s) to set the @fa-font-path / $fa-font-path variable

@usage
`grunt fontAwesomeVars`		//run all tasks in this multiTask with their defaults / standard config

@param {String} variablesLessPath Path to the variables.less file to edit
@param {String} variablesScssPath Path to the _variables.scss file to edit
@param {String} fontPath Path to set fa-font-path to in variables.less / _variables.scss

@toc
0. setup
1. init
2. updateFile
3. clearFontPaths
*/

module.exports = function(grunt) {
	grunt.registerMultiTask("fontAwesomeVars", "Edit the font-awesome variables.less and/or _variables.scss file(s)", function() {
		/**
		Setup - Pull in grunt config for this task/target and extend from defaults.
		@toc 0.
		*/
		
		/**
		@toc 1.
		@method init
		@param {Object} conf
			@param {String} variablesLessPath Path to the variables.less file to edit
			@param {String} variablesScssPath Path to the _variables.scss file to edit
			@param {String} fontPath Path to set fa-font-path to in variables.less / _variables.scss
		*/
		function init(conf, params) {
			if(conf.variablesLessPath !==undefined) {
				updateFile(conf.variablesLessPath, 'less', conf, {});
			}
			if(conf.variablesScssPath !==undefined) {
				updateFile(conf.variablesScssPath, 'scss', conf, {});
			}
		}
		
		/**
		@toc 2.
		@method updateFile
		*/
		function updateFile(filePath, type, conf, params) {
			//read in the file
			var fileContents =grunt.file.read(filePath);
			
			var fontPathString;
			var newLine;
			if(type =='less') {
				fontPathString ='@fa-font-path';
				newLine ='\n'+fontPathString+': "'+conf.fontPath+'";\n';		//the new line to insert
			}
			else if(type =='scss') {
				fontPathString ='$fa-font-path';
				newLine ='\n'+fontPathString+': "'+conf.fontPath+'" !default;\n';		//the new line to insert
			}
			
			//remove all the fontPathString lines and find the beginning of the FIRST one (if there is one at all)
			var newFileContents;
			var ret1 =clearFontPaths(fileContents, fontPathString, {});
			
			if(ret1.insertIndex >-1) {
				newFileContents =ret1.fileContents.slice(0, ret1.insertIndex)+newLine+ret1.fileContents.slice((ret1.insertIndex+1), ret1.fileContents.length);
			}
			else {		//if line does NOT exist, just write to end of file
				newFileContents =ret1.fileContents+newLine;
			}
			
			//write the new (now edited) file contents back to the original file (thus over-writing it)
			grunt.file.write(filePath, newFileContents);
			
			//log result
			grunt.log.writeln('Wrote: '+newLine+' to file: '+filePath);
		}
		
		/**
		@toc 3.
		@method clearFontPaths
		@param {String} fileContents The full file (string) to search
		@param {String} fontPathString The string to search for and remove - ALL lines with this in it will be removed
		@return {Object}
			@param {Number} insertIndex The position (indexOf()) the FIRST instance of the fontPathString OR -1 if not found
			@param {String} fileContents The NEW file contents, with all fontPathString lines cut out
		*/
		function clearFontPaths(fileContents, fontPathString, params) {
			var ret ={insertIndex:-1, fileContents:false};
			var index1;
			var endOfLine, begOfLine, len1;
			while((index1 =fileContents.lastIndexOf(fontPathString)) >-1) {
				endOfLine =fileContents.indexOf('\n', index1);
				begOfLine =fileContents.lastIndexOf('\n', index1);
				len1 =fileContents.length;
				// console.log('index1: '+index1+' fontPathString: '+fontPathString+' begOfLine: '+begOfLine+' endOfLine: '+endOfLine+' len1: '+len1+' cutString: '+fileContents.slice(begOfLine, endOfLine));		//TESTING
				fileContents =fileContents.slice(0, begOfLine)+''+fileContents.slice((endOfLine), len1);		//make sure to add in a newline where we cut so lines don't run together! - update just leave in the newline after endOfLine index
				
				//save lowest index (for first instance of the fontPathString)
				if(ret.insertIndex <0 || begOfLine <ret.insertIndex) {
					ret.insertIndex =begOfLine;
				}
			}
			
			ret.fileContents =fileContents;
			return ret;
		}

		init(this.data, {});		//start everything
	});
};