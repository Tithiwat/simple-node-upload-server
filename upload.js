'use strict';

var formidable = require('formidable');
var fs = require('fs');
var http = require('http');
var util = require('util');

http.createServer(function (req, res) {
  if (req.url == '/upload' && req.method.toLowerCase() == 'post') {
    // parse a file upload
    var form = new formidable.IncomingForm();

    form.uploadDir = __dirname + "/upload";
    // form.file.name = null;
    form.parse(req, function (err, fields, files) {
      res.writeHead(200, {
        'content-type': 'text/plain'
      });
      res.write('received upload:\n\n');
      res.end(util.inspect({
        fields: fields,
        files: files
      }));
    });

    form.on('file', function (field, file) {
      //rename the incoming file to the file's name
      fs.rename(file.path, form.uploadDir + "/" + file.name);
    });

    form.on('error', function (err) {
      console.log("an error has occured with form upload");
      console.log(err);
      req.resume();
    });

    form.on('aborted', function (err) {
      console.log("user aborted upload");
    });

    form.on('end', function () {
      console.log('-> upload done');
    });

    return;
  }

  // show a file upload form
  res.writeHead(200, {
    'content-type': 'text/html'
  });
  res.end(
    '<form action="/upload" enctype="multipart/form-data" method="post">' +
    '<input type="text" name="title"><br>' +
    '<input type="file" name="upload" multiple="multiple"><br>' +
    '<input type="submit" value="Upload">' +
    '</form>'
  );
}).listen(8080);