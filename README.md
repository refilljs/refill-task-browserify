# ZKflow task browserify

Browserify task in zkflow format

Made by Zaklinacze Kodu

Shields
-------

[![npm](https://img.shields.io/npm/v/zkflow-task-browserify.svg?style=flat-square)](https://www.npmjs.com/package/zkflow-task-browserify)
[![npm](https://img.shields.io/npm/l/zkflow-task-browserify.svg?style=flat-square)](https://www.npmjs.com/package/zkflow-task-browserify)
[![npm](https://img.shields.io/npm/dm/zkflow-task-browserify.svg?style=flat-square)](https://www.npmjs.com/package/zkflow-task-browserify)<br>
[![Travis](https://img.shields.io/travis/zaklinaczekodu/zkflow-task-browserify/master.svg?style=flat-square)](https://travis-ci.org/zaklinaczekodu/zkflow-task-browserify)
[![Code Climate](https://img.shields.io/codeclimate/github/zaklinaczekodu/zkflow-task-browserify.svg?style=flat-square)](https://codeclimate.com/github/zaklinaczekodu/zkflow-task-browserify)<br>
[![David](https://img.shields.io/david/zaklinaczekodu/zkflow-task-browserify.svg?style=flat-square)](https://david-dm.org/zaklinaczekodu/zkflow-task-browserify)
[![David](https://img.shields.io/david/dev/zaklinaczekodu/zkflow-task-browserify.svg?style=flat-square)](https://david-dm.org/zaklinaczekodu/zkflow-task-browserify)<br>
[![GitHub forks](https://img.shields.io/github/forks/zaklinaczekodu/zkflow-task-browserify.svg?style=flat-square)](https://github.com/zaklinaczekodu/zkflow-task-browserify)
[![GitHub stars](https://img.shields.io/github/stars/zaklinaczekodu/zkflow-task-browserify.svg?style=flat-square)](https://github.com/zaklinaczekodu/zkflow-task-browserify)
[![GitHub followers](https://img.shields.io/github/followers/zaklinaczekodu.svg?style=flat-square)](https://github.com/zaklinaczekodu/zkflow-task-browserify)

Installation
------------

```bash
npm install --save zkflow-task-browserify zkflow gulp
```

Example
-------

ZKflow taks browserify is used in [ZKflow for Angular](https://github.com/zaklinaczekodu/zkflow-angular)

Usage
-----

gulpfile.js

```javaScript
require('zkflow')({
  js: {
    task: require('zkflow-task-browserify')
  }
}, require('gulp'), mode, getOutputDir)
```

### mode

Shared configuration object. Properties used

```javaScript
{
  env: 'dev',                                 // 'prod', 'test'
  watch: true,                                // false
  angularMainModuleProdFallback: undefined    // this will be set to true if test or dev entries are not found
}
```

### getOutputDir

function that will return a base for output dir, for example

```javaScript
function () {
  return 'dist/';
}
```

in this case js will be saved in `dist/index.js` file

Default options
---------------

```javaScript
{
  devEntries: 'src/dev/index.js',
  prodEntries: 'src/index.js',
  testEntries: 'src/test/index.js',
  uglify: undefined,                    // gulp-uglify options
  browserifyTransforms: []
}
```