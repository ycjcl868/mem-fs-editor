'use strict';

var assert = require('assert');
var path = require('path');
var editor = require('..');
var memFs = require('mem-fs');

describe('#copy()', function () {
  beforeEach(function() {
    var store = memFs.create();
    this.fs = editor.create(store);
  });

  it('copy file', function () {
    var filepath = path.join(__dirname, 'fixtures/file-a.txt');
    var initialContents = this.fs.read(filepath);
    var newPath = '/new/path/file.txt';
    this.fs.copy(filepath, newPath);
    assert.equal(this.fs.read(newPath), initialContents);
  });

  it('copy file and process contents', function () {
    var filepath = path.join(__dirname, 'fixtures/file-a.txt');
    var initialContents = this.fs.read(filepath);
    var contents = 'some processed contents';
    var newPath = '/new/path/file.txt';
    this.fs.copy(filepath, newPath, {
      process: function (contentsArg) {
        assert.equal(contentsArg, initialContents);
        return contents;
      }
    });
    assert.equal(this.fs.read(newPath), contents);
  });
});