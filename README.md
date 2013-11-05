# grunt-font-awesome-vars

Simple file read/write plugin to update the font-awesome variables.less file @fa-font-path (i.e. for use with Bower to install font-awesome - which you then need to edit variables.less to the correct font-path. This plugin automates that process - both for the first time and in case you update the font-awesome bower plugin or want other developers to use bower install and have it "just work" without having to remember to edit the variables.less file after each install/update).

## Getting Started
This plugin requires Grunt `~0.4.1`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-font-awesome-vars --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-font-awesome-vars');
```


## Font Awesome Vars task

### Usage Examples
Gruntfile.js
```js
	fontAwesomeVars: {
		main: {
			variablesLessPath: 'variables.less',
			fontPath: '../bower_components/font-awesome/fonts'		//NOTE: this must be relative to FINAL, compiled .css file - NOT the variables.less file! For example, this would be the correct path if the compiled css file is main.css which is in 'src/build' and the font awesome font is in 'src/bower_components/font-awesome/fonts' - since to get from main.css to the fonts directory, you first go back a directory then go into bower_components > font-awesome > fonts.
		}
	}
```

## Development
See https://npmjs.org/doc/developers.html for notes on publishing npm modules in general.
- run `grunt` to ensure no issues
- bump version number in `package.json`
- update `CHANGELOG.md` (and potentially this `README.md`) file
- `git commit` changes
- `npm publish`
- push to github (to update there as well)

## TODO
- support SCSS/SASS?