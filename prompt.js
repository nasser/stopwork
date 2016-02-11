/*
 * simple sexy full screen prompts
 * 
 * ramsey nasser, sep 2015
 */

function fullScreenPrompt (options, cb) {
  var input = document.createElement("input");
  input.setAttribute("type", options.type || "text");
  if(options.placeholder) input.setAttribute("placeholder", options.placeholder);
  if(options.value) input.value = options.value;
  input.setAttribute("class", "prompt");
  input.setAttribute("style", "position: fixed;\
                               top: 0;\
                               left: 0;\
                               z-index: 100;\
                               width: 100%;\
                               height: 100%;\
                               text-align: center;\
                               border: 0;\
                               opacity: 0.9;\
                               font-family: Menlo, monospace;\
                               font-size: 5vw;");
  
  input.onkeydown = function(event) {
    event.stopPropagation();
    if (event.keyCode == 13) { // return
      cb(input.value);
      document.body.removeChild(input);
      
    } else if(event.which == 27) { // esc
      document.body.removeChild(input);
      
    }
  }
  
  input.onpaste = function(event) {
    event.stopPropagation();
  }
  
  document.body.appendChild(input);
  input.focus();
}

function textPrompt (options, cb) {
  options.type = "text";
  fullScreenPrompt(options, cb);
}

function passwordPrompt (options, cb) {
  options.type = "password";
  fullScreenPrompt(options, cb);
}