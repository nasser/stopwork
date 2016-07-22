var fs = {
  request: function(bytes, cb) {
    navigator.webkitPersistentStorage.requestQuota(bytes, function(actualBytes) {
      if(cb) cb(actualBytes);
    });
  },
  
  query: function(cb) {
    navigator.webkitPersistentStorage.queryUsageAndQuota(cb);
  },
  
  read: function(filename, cb, err) {
    window.webkitRequestFileSystem(PERSISTENT, 0, function(fs) {
      fs.root.getFile(filename, {},
        function(entry) {
          entry.file(function(file) {
            var reader = new FileReader();
            if(err)
              reader.onerror = err;
            if(cb) 
              reader.onloadend = function(e) {
               cb(e.target.result);
             }
             reader.readAsText(file);
           });
        });
    });
  },
  
  write: function(filename, blob, cb, err) {
    console.log("writing " + blob.size + "b " + blob.type + " to " + filename);
    window.webkitRequestFileSystem(PERSISTENT, blob.size, function(fs) {
      fs.root.getFile(filename, {create:true, exclusive:false},
        function(entry) {
          entry.file(function(file) {
            if(blob.size < file.size) {
              entry.createWriter(function(writer) {
                writer.onwriteend = function(e) {
                  writer.onwriteend = null;
                  if(cb) writer.onwriteend = cb;
                  if(err) writer.onerror = err;
                  writer.write(blob);
                }
                
                writer.truncate(blob.size);
              });
              
            } else {
              entry.createWriter(function(writer) {
                if(cb) writer.onwriteend = cb;
                if(err) writer.onerror = err;
                writer.write(blob);
              });
            }
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
    window.webkitRequestFileSystem(PERSISTENT, 0, function(fs) {
      fs.root.getFile(filename, {},
        function(entry) {
          entry.remove(cb || function() {});
        });
    });
  }
}