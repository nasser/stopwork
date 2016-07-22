function deselectAll() {
  var currents = document.querySelectorAll(".current");
  [].forEach.call(currents, function(c) {
    var video = c.querySelector("video");
    if(video) {
      video.pause();
      video.currentTime = 0;
    }
      
    c.removeAttribute("class");
  });
}

function select(element) {
  element.setAttribute("class", "current");
}

window.addEventListener("keydown", function(e) {
  var currents = document.querySelectorAll(".current");
  var lastCurrent = currents[currents.length - 1];
  var firstCurrent = currents[0];
  
  // right
  if(e.which == 39 && !e.altKey && !e.shiftKey) {
    deselectAll();
    select(lastCurrent ? (lastCurrent.nextElementSibling || lastCurrent.parentNode.firstElementChild) : document.querySelector("slide"));
    
  // left
  } else if(e.which == 37 && !e.altKey && !e.shiftKey) {
    deselectAll();
    select(firstCurrent ? (firstCurrent.previousElementSibling || firstCurrent.parentNode.lastElementChild) : document.querySelector("slide"));    
    
  // space
  } else if(e.which == 32) {
    var video = document.querySelector(".current video");
    if(video) {
      if(video.paused)
        video.play();
      else
        video.pause();
    }
  }
  
  // replay gifs
  setTimeout(() => {
    var img = document.querySelector(".current img");
    if(img) {
      img.setAttribute("src", img.getAttribute("src"));
    }
  }, 0);
});