var fs = require("fs")
var os = require("os")
var path = require("path")

// http://stackoverflow.com/questions/23986953/blob-saved-as-object-object-nodejs
var blobToBase64 = function(blob, cb) {
  var reader = new FileReader();
  reader.onload = function() {
    var dataUrl = reader.result;
    var base64 = dataUrl.split(',')[1];
    cb(base64);
  };
  reader.readAsDataURL(blob);
};

var cache = {
  read: function(hash, cb) {
    // TODO duplicated logic
    var cachedir = os.homedir() + path.sep + ".stopwork" + path.sep;
    fs.readFile(cachedir + hash, (err, file) => {
      if(err) throw err;
      cb(data);
    });
  },
  
  readSync: function(hash) {
    // TODO duplicated logic
    var cachedir = os.homedir() + path.sep + ".stopwork" + path.sep;
    return fs.readFileSync(cachedir + hash);
  },
  
  write: function(filename, blob, cb, err) {
    // TODO duplicated logic
    var cachedir = os.homedir() + path.sep + ".stopwork" + path.sep;
    console.log("cachedir: " + cachedir);
    
    fs.mkdir(cachedir, () => {
      console.log("writing " + blob.size + "b " + blob.type + " to " + filename);
      blobToBase64(blob, (b64) => {
        var buf = new Buffer(b64, 'base64');
        fs.writeFile(cachedir + filename, buf, function(err) {
          cb()
        });
      });
    });
  },

  writeContent: function(filename, content, type, cb, err) {
    var blob = new Blob([content], {type: type});
    fs.write(filename, blob, cb, err);
  },

  writeText: function(filename, text, cb, err) {
    fs.writeContent(filename, text, "text/plain", cb, err);
  },
  
  remove: function(filename, cb) {
    console.log("cache.remove " + filename)
    // TODO duplicated logic
    var cachedir = os.homedir() + path.sep + ".stopwork" + path.sep;
    fs.unlink(cachedir + filename, cb);
  }
}