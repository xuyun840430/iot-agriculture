/**
 * Created by Information on 2016/5/30.
 */
var mongoose = require('mongoose');
var _ = require('lodash');

var mu = require('mu2');
var assert = require('assert'),
  fs = require('fs'),
  path = require('path');
var mkdirp = require('mkdirp');

var JSZip = require("jszip");

/**
 * Generate a plugin with template on server-side
 */
exports.generatePlugin = function (req, res) {
  console.log('/<------ Generating Plugun with Template ------>/');
  console.log(req.body);


/**
 * IMPLEMENT CODE Generator here
 */

  /* Step 1: Generate plugin file system structure with plugin name */
  // Define paths
  mu.root = path.join(__dirname, '..', 'generator/templates/plugin/');
  destPath = path.join(__dirname, '..', 'generator/generated/');

  // // Read generator rules from plugins.js
  // var js = fs.readFileSync(mu.root + '/plugins.js').toString();
  // js = eval('(' + js + ')');

  // Read generator rules from client-side
  js = req.body;

  // Make directories
  var pluginSymblicName = 'com.plugins.' + js.pluginname;
  var pluginPath = destPath + pluginSymblicName + '/';

  // Create zip and zip write stream instance
  var zip = new JSZip();

  // var wstreamZip = fs.createWriteStream(destPath + pluginSymblicName + '.zip');


  /* Step 2: Do plugin generation process */
  // TODO: create a function to read all files (incl. folder path) to buffer
  [
    'CMakeLists.txt',
    'manifest_headers.cmake',
    'target_libraries.cmake',
    '{{pluginname}}WindowActivator.cpp',
    '{{pluginname}}WindowActivator.h',
    '{{pluginname}}ZmqBuilder.cpp',
    '{{pluginname}}ZmqBuilder.h',
    'gui/{{pluginname}}WindowWidgetPlugin.cpp',
    'gui/{{pluginname}}WindowWidgetPlugin.h',
    'gui/form.ui',
    'gui/form.h',
    'gui/form.cpp'
  ].forEach(function (name) {

    // Change plugin name
    pluginFileName = name.replace('{{pluginname}}', js.pluginname);

    // Create write stream to write buffer content to files
    var buffer = '';

    /* Generate plugin files in local file system (ONLY for checking) */
    mu.compileAndRender(name, js) // Use predefined 'mu.root' as root path
      .on('data', function (c) {
        buffer += c.toString();
      })
      .on('end', function () {


        // Compress generated file of plugin into zip file
        zip.file(name.replace('{{pluginname}}', js.pluginname), buffer);

        zip.generateAsync({ type: "nodebuffer" })
          .then(function (content) {
            fs.writeFileSync(destPath + pluginSymblicName + '.zip', content);
            console.log('/<------ Compress files into zip file sync: ' + name.replace('{{pluginname}}', js.pluginname) + ' ------>/');

            // TODO: Send 'success' to client to change to 'download' UI type when all files generated (impl. with count)
            // res.status(200).send('OK'); 
          });
      });
  }) // END forEach()


};

/**
 * Download a generated plugin with template from server-side
 */
exports.downloadPlugin = function (req, res) {

  // Set download path
  downloadPath = path.join(__dirname, '..', 'generator/generated/');

  /* Send zip to download */
  var zipName = req.params.pluginname + '.zip'
  var zipFilePath = downloadPath + zipName;
  
  // Set download file header incl. filename and type
  res.setHeader("Content-disposition", "attachment; filename*=UTF-8''" + encodeRFC5987ValueChars(zipName));
  res.setHeader('Content-type', 'binary/octet-stream');

  // Check file existance
  fs.exists(zipFilePath, function (exists) {
    if (exists) {
      fs.createReadStream(zipFilePath)
        .on("err", function () { res.status(400).send("No generated plugin found with that name"); })
        .on('end', function () {
          /* TODO: Comment out deleting generated zip, delete generated zips every day/half day periodically */
          // fs.unlink(zipFilePath, function (err) {
          //   if (err) { console.log("Error occured on deleting generated file"); } 
          //   else { 
          //     console.log('Generated file deleted with name: ', zipName); 
          //   }
          // })
        })
        .pipe(res);
    } else {
      console.log("No generated plugin file is found with: " + zipFilePath);
    }
  });


};

/**
 * Mkdir -p.
 *
 * @param {String} path
 * @param {Function} fn
 */

function mkdir(path, fn) {
  mkdirp(path, 0755, function (err) {
    if (err) throw err;
    console.log('   \033[36mcreate\033[0m : ' + path);
    fn && fn();
  });
}

function encodeRFC5987ValueChars(str) {
  return encodeURIComponent(str).
    // Note that although RFC3986 reserves "!", RFC5987 does not,
    // so we do not need to escape it
    replace(/['()]/g, escape). // i.e., %27 %28 %29
    replace(/\*/g, '%2A').
    // The following are not required for percent-encoding per RFC5987, 
    // so we can allow for a little better readability over the wire: |`^
    replace(/%(?:7C|60|5E)/g, unescape);
}

// function copy_template(from, to) {
//   from = path.join(__dirname, '..', 'templates/com.plugins.template/', from);
//   write(to, fs.readFileSync(from, 'utf-8'));
// }

/**
 * Check if the given directory `path` is empty.
 *
 * @param {String} path
 * @param {Function} fn
 */

// function emptyDirectory(path, fn) {
//   fs.readdir(path, function (err, files) {
//     if (err && 'ENOENT' != err.code) throw err;
//     fn(!files || !files.length);
//   });
// }

/**
 * echo str > path.
 *
 * @param {String} path
 * @param {String} str
 */

// function write(path, str, mode) {
//   fs.writeFileSync(path, str, { mode: mode || 0666 });
//   console.log('   \x1b[36mcreate\x1b[0m : ' + path);
// }
