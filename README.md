Refill task browserify
======================

Browserify task in refill format

[<img alt="Made by Zaklinacze Kodu" src="http://zaklinaczekodu.com/_assets/madeBy.svg" width="200">](http://zaklinaczekodu.com)

[Facebook](https://www.facebook.com/zaklinaczekodu)

Shields
-------

[![npm](https://img.shields.io/npm/v/refill-task-browserify.svg?style=flat-square)](https://www.npmjs.com/package/refill-task-browserify)
[![npm](https://img.shields.io/npm/l/refill-task-browserify.svg?style=flat-square)](https://www.npmjs.com/package/refill-task-browserify)
[![npm](https://img.shields.io/npm/dm/refill-task-browserify.svg?style=flat-square)](https://www.npmjs.com/package/refill-task-browserify)
[![Travis](https://img.shields.io/travis/refilljs/refill-task-browserify/master.svg?style=flat-square)](https://travis-ci.org/refilljs/refill-task-browserify)<br>
[![bitHound Overall Score](https://www.bithound.io/github/refilljs/refill-task-browserify/badges/score.svg)](https://www.bithound.io/github/refilljs/refill-task-browserify)
[![bitHound Dependencies](https://www.bithound.io/github/refilljs/refill-task-browserify/badges/dependencies.svg)](https://www.bithound.io/github/refilljs/refill-task-browserify/master/dependencies/npm)
[![bitHound Dev Dependencies](https://www.bithound.io/github/refilljs/refill-task-browserify/badges/devDependencies.svg)](https://www.bithound.io/github/refilljs/refill-task-browserify/master/dependencies/npm)
[![bitHound Code](https://www.bithound.io/github/refilljs/refill-task-browserify/badges/code.svg)](https://www.bithound.io/github/refilljs/refill-task-browserify)<br>
[![GitHub forks](https://img.shields.io/github/forks/refilljs/refill-task-browserify.svg?style=flat-square)](https://github.com/refilljs/refill-task-browserify)
[![GitHub stars](https://img.shields.io/github/stars/refilljs/refill-task-browserify.svg?style=flat-square)](https://github.com/refilljs/refill-task-browserify)
[![GitHub watchers](https://img.shields.io/github/watchers/refilljs/refill-task-browserify.svg?style=flat-square)](https://github.com/refilljs/refill-task-browserify)

Installation
------------

```bash
npm install --save refill-task-browserify refill gulp
```

Example
-------

Refill taks browserify is used in [Refill for Angular](https://github.com/refilljs/refill-angular)

Usage
-----

gulpfile.js

```javaScript
require('refill')({
  js: {
    task: require('refill-task-browserify')
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

Changelog
---------

[Changelog at github](https://github.com/refilljs/refill-task-browserify/releases)

Sponsors
--------

[<img alt="Zaklinacze Kodu" src="http://zaklinaczekodu.com/_assets/logo.svg" width="200">](http://zaklinaczekodu.com)

