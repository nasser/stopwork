function initializeSlideEvents(slide) {
  slide.onclick = function(e) {
    console.log(e)
    if(!e.shiftKey) deselectAll();
    select(this);
  }
  
  slide.ondblclick = function(event) {
    promptEditSlide(this);
  };
}

function newSlide() {
  var slide = document.createElement("slide");
  slide.setAttribute("source", "");
  initializeSlideEvents(slide);
  return slide;
}

function promptNewSlide(insertAfter) {
  textPrompt({}, function(content) {
    var slide = newSlide();
    slide.innerHTML = markdown.toHTML(content, {gfm: true});
    slide.setAttribute("source", content);
    
    deselectAll();
    select(slide);
    insertAfter.parentNode.insertBefore(slide, insertAfter.nextElementSibling);
  });
}

function promptEditSlide(slide) {
  textPrompt({value: slide.getAttribute("source")}, function(content) {
    slide.innerHTML = markdown.toHTML(content);
    slide.setAttribute("source", content);
  });
}

document.onpaste = function(event) {
  var currents = document.querySelectorAll(".current");
  var lastCurrent = currents[currents.length - 1];
  var firstCurrent = currents[0];

  var items = event.clipboardData.items;
  for (var i = 0; i < items.length; i++) {
    if(items[i].type == "text/plain") {
      var content = event.clipboardData.getData(items[i].type);
      var slide = newSlide();
      slide.setAttribute("source", content);
      slide.innerHTML = markdown.toHTML(content);
      if(lastCurrent && lastCurrent.nextElementSibling)
        lastCurrent.parentNode.insertBefore(slide, lastCurrent.nextElementSibling)
      else
        document.body.appendChild(slide);
      
    } else if(items[i].kind == "file") {
      var blob = items[i].getAsFile();
      var reader  = new FileReader();
      reader.onload = function () {
        var slide = newSlide();
        var img = document.createElement("img");
        img.src = reader.result;
        slide.appendChild(img);
        if(lastCurrent && lastCurrent.nextElementSibling)
          lastCurrent.parentNode.insertBefore(slide, lastCurrent.nextElementSibling)
        else
          document.body.appendChild(slide);
        
      }
      reader.readAsDataURL(blob);
    }
  };
}

// http://stackoverflow.com/questions/10261989/html5-javascript-drag-and-drop-file-from-external-window-windows-explorer
document.ondragover = function(event) {
  event.stopPropagation();
  event.preventDefault();
  event.dataTransfer.dropEffect = 'copy';
};

document.ondrop = function(event) {
  var currents = document.querySelectorAll(".current");
  var lastCurrent = currents[currents.length - 1];
  var firstCurrent = currents[0];

  event.stopPropagation();
  event.preventDefault();
  
  if(event.dataTransfer.getData("text/html")) {
    var temp = document.createElement('temp');
    temp.innerHTML = event.dataTransfer.getData("text/html");
    
    var slide = newSlide();
    var img = document.createElement('img');
    img.src = temp.querySelector("img").getAttribute("src");
    slide.appendChild(img);
    document.body.insertBefore(slide, lastCurrent.nextElementSibling);

  } else if(event.dataTransfer.files.length > 0) {
    var files = event.dataTransfer.files;
    for (var i = 0; i < files.length; i++) {
      console.log(files[i]);
      if (files[i].type.match(/image.*/)) {
        var reader = new FileReader();
        reader.onload = function() {
          var slide = newSlide();
          var img = document.createElement('img');
          img.src = reader.result;
          slide.appendChild(img);
          document.body.appendChild(slide);
        }
        reader.readAsDataURL(files[i]);
      } else if (files[i].type.match(/video.*/)) {
        var type = files[i].type;
        var reader = new FileReader();
        reader.onload = function() {
          var slide = newSlide();
          var video = document.createElement('video');
          var source = document.createElement('source');
          source.src = reader.result;
          source.setAttribute("type", type);
          video.setAttribute("controls", true);
          video.appendChild(source);
          slide.appendChild(video);
          document.body.appendChild(slide);
        }
        reader.readAsDataURL(files[i]);
      }
    }
  } else if(event.dataTransfer.items.length > 0) {
    var items = event.dataTransfer.items;
    for (var i = 0; i < items.length; i++) {
      if(items[i].type == "text/html") {
        var blob = items[i].getAsFile();
        var reader = new FileReader();
        reader.onload = function() {
          var temp = document.createElement("temp");
          temp.innerHTML = reader.result;
          var slides = temp.querySelectorAll("slide");
          if(slides.length > 0) {
            while(document.body.lastChild)
              document.body.removeChild(document.body.lastChild);
            for (var i = 0; i < slides.length; i++) {
              document.body.appendChild(slides[i]);
            };
          }
        }
        reader.readAsText(blob);
        
      } else if(items[i].type == "text/uri-list") {
        items[i].getAsString(function(s) {
          var slide = newSlide();
          var img = document.createElement('img');
          img.src = s;
          slide.appendChild(img);
          document.body.insertBefore(slide, lastCurrent.nextElementSibling);
        });
        break;
      }
    }
  }
}

function deleteSlide(slide) {
  if(slide.nextElementSibling)
    select(slide.nextElementSibling);
  else if(slide.previousElementSibling)
    select(slide.previousElementSibling);
  document.body.removeChild(slide);
}

window.addEventListener("keydown", function(e) {
  var currents = document.querySelectorAll(".current");
  var lastCurrent = currents[currents.length - 1];
  var firstCurrent = currents[0];
  
  // alt + right
  if(e.which == 39 && e.altKey && !e.shiftKey) {
    if(lastCurrent.nextElementSibling)
      lastCurrent.parentNode.insertBefore(lastCurrent.nextElementSibling, firstCurrent);
    
  // shift + right
  } else if(e.which == 39 && !e.altKey && e.shiftKey) {
    select(lastCurrent.nextElementSibling);
    
  // alt + left
  } else if(e.which == 37 && e.altKey && !e.shiftKey) {
    if(firstCurrent.previousElementSibling)
      firstCurrent.parentNode.insertBefore(firstCurrent.previousElementSibling, lastCurrent.nextElementSibling);
    
  // shift + left
  } else if(e.which == 37 && !e.altKey && e.shiftKey) {
    select(firstCurrent.previousElementSibling);
    
  // del
  } else if(e.which == 8) {
    e.preventDefault();
    e.stopPropagation();
    deleteSlide(lastCurrent);
    
  // return
  } else if(e.which == 13 && !e.altKey) {
    promptEditSlide(firstCurrent);
    
  // alt + return
  } else if(e.which == 13 && e.altKey) {
    // promptNewSlide(lastCurrent);
    var slide = newSlide();
    deselectAll();
    select(slide);
    if(lastCurrent)
      lastCurrent.parentNode.insertBefore(slide, lastCurrent.nextElementSibling);
    else
      document.body.appendChild(slide);
    promptEditSlide(slide);
    
  // esc
  } else if(e.which == 27) {
    if(document.querySelector(".prompt") == null) {
      deselectAll();
      select(firstCurrent);
      
      if(document.body.getAttribute("class") == "outline")
        document.body.setAttribute("class", "show");
      else
        document.body.setAttribute("class", "outline");
    }
    
  // ctrl + d
  } else if(e.which == 68 && e.ctrlKey) {
    deselectAll();
    for (var i = 0; i < currents.length; i++) {
      var slide = newSlide();
      slide.innerHTML = currents[i].innerHTML;
      slide.setAttribute("source", currents[i].getAttribute("source"));
      currents[i].parentNode.insertBefore(slide, currents[i].nextElementSibling);
      select(slide);
      
    };
    
  // ctrl + s
  } else if(e.which == 83 && e.ctrlKey) {
    deselectAll();
    select(document.querySelector("slide"));
    
    var head = "<head><meta charset=\"utf8\">" +
               styles.join("\n") + 
               scripts.join("\n") + 
               "</head>";
               
    var body = "<body class=\"exported show\">" + 
               document.body.innerHTML +
               "</body>";
    var html = "<html>" + head + body + "</head>";
    
    var d = new Date().toLocaleString().
                       replace(/\//g, "-").
                       replace(/:/g, "-").
                       replace(/ /g, "");
                       
    var blob = new Blob([html], {type:"text/html"});
    var a = document.createElement("a");
    a.href = window.URL.createObjectURL(blob);
    a.setAttribute("download", document.querySelectorAll("slide")[0].textContent.trim() + " " + d + ".html");
    a.click();
  }
});

function get(url, cb) {
  var request = new XMLHttpRequest();
  request.onload = function() {
    if(request.status === 200)
      cb(this.responseText);
    else
      console.log(url + " failed " + request.status);
  }
  request.open('GET', url, true);
  request.send(null);
}

var styles = [];
var scripts = [];

window.onload = function() {
  // prepare for saving
  var styleElements = document.querySelectorAll("style");
  for (var i = 0; i < styleElements.length; i++) {
    styles.push('<style type="text/css">\n' + styleElements[i].innerHTML + '\n</style>');
  };
  
  var linkElements = document.querySelectorAll("link");
  for (var i = 0; i < linkElements.length; i++) {
    get(linkElements[i].href, function(s) {
      styles.push('<style type="text/css">\n' + s + '\n</style>');
    });
  };
  
  var scriptElements = document.querySelectorAll("script[export]");
  for (var i = 0; i < scriptElements.length; i++) {
    if(scriptElements[i].innerHTML.length > 0) {
      scripts.push('<script type="text/javascript">\n' + scriptElements[i].innerHTML + '\n<\/script>');
    }
    if(scriptElements[i].src) {
      get(scriptElements[i].src, function(s) {
        scripts.push('<script type="text/javascript">\n' + s + '\n<\/script>');
      });
    }
    
    if(localStorage.stopwork)
      document.body.innerHTML = localStorage.stopwork;
    
    setInterval(function() {
      localStorage.stopwork = document.body.innerHTML;
    }, 500);
  }
  
  var slides = document.querySelectorAll("slide");
  for (var i = slides.length - 1; i >= 0; i--) {
    initializeSlideEvents(slides[i]);
  };
}