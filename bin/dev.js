#!/usr/bin/env node
var path = require('path');
var projectRootPath = path.resolve(__dirname, '..');
var srcPath = path.join(projectRootPath, 'src');
var appPath = path.join(projectRootPath, 'app');
var fs = require('fs');
var debug = require('debug')('dev');
require('colors');
var log = console.log.bind(console, '>>> [DEV]:'.red);
var babelCliDir = require('babel-cli/lib/babel/dir');
var babelCliFile = require('babel-cli/lib/babel/file');
var chokidar = require('chokidar');
var watcher = chokidar.watch(path.join(__dirname, '../src'));

watcher.on('ready', function() {
  log('Compiling ...'.green);
  babelCliDir({outDir: 'app/', retainLines: true, sourceMaps: true}, [ 'src/' ])
  require('../app');
  log('🎵 App Started'.green);

  watcher
    .on('add', function (adsPath) {
      compileFile('src/', 'app/', path.relative(srcPath, adsPath), cacheClean);
    })
    .on('change', function (adsPath) {
      compileFile('src/', 'app/', path.relative(srcPath, adsPath), cacheClean);
    })
    .on('unlink', function (adsPath) {
      var rmfileRelative = path.relative(srcPath, adsPath);
      var rmfile = path.join(appPath, rmfileRelative);
      try {
        fs.unlinkSync(rmfile);
        fs.unlinkSync(rmfile + '.map');
      } catch (error) {
        debug('fail to unlink' + error);
        return;
      }
      console.log('Deleted', rmfileRelative);
      cacheClean();
    });
});

function compileFile(srcDir, outDir, filename, cb) {
  var outFile = path.join(outDir, filename);
  var srcFile = path.join(srcDir, filename);
  try {
    babelCliFile({
      outFile: outFile,
      retainLines: true,
      sourceMaps: true,
      highlightCode: true,
      comments: true,
      babelrc: true
    }, [ srcFile ], { highlightCode: true, comments: true, babelrc: true, ignore: [], sourceMaps: true });
  } catch (e) {
    console.error('Error while compiling file%s',filename, e);
    return;
  }
  console.log(srcFile + '->' + outFile);
  cb && cb();
}

function cacheClean() {
  Object.keys(require.cache).forEach(function (id) {
    if (/[\/\\](app)[\/\\]/.test(id)) {
      delete require.cache[id];
    }
  });
  console.log('App Cache cleaned...'.green);
}

process.on('quit', function(e) {
  log('App Quit'.green);
})