function deselectAll() {
  var currents = document.querySelectorAll(".current");
  [].forEach.call(currents, function(c) {
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
  }
});