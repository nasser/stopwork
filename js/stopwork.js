function next_slide () {
  var current_slide = $(".slide.current");
  current_slide.removeClass("current");
  var next_slide = current_slide.next().size() == 0 ? $(".slide:first") : current_slide.next();
  next_slide.addClass("current");
}

function prev_slide () {
  var current_slide = $(".slide.current");
  current_slide.removeClass("current");
  var prev_slide = current_slide.prev().size() == 0 ? $(".slide:last") : current_slide.prev();
  prev_slide.addClass("current");
}

function add_slide (content) {
  var new_slide = $("<div class='slide'>");

  /* image slide */
  if(content.match(/\.(png|jpg|jpeg|gif)/i)) {
    new_slide.addClass("image");
    if(!content.match(/^http/)) content = "assets/" + content;
    new_slide.css("background-image", "url(" + content + ")");
    $("body").append(new_slide);

  /* web slide */
  } else if(content.match(/^http/)) {
    new_slide.addClass("web")
    var iframe = $("<iframe src='" + content + "'>");
    new_slide.append(iframe);
    $("body").append(new_slide);
    iframe.keydown(function(e) {
      console.log(e);
    });

  /* text slide */
  } else {
    new_slide.addClass("text")
    new_slide.html(marked(content));
    $("body").append(new_slide);

    new_slide.css("margin-top", "-" + new_slide.height()/2 + "px");

  }

}

function present(content) {
  // populate slides
  for (var i = 0; i < content.length; i++) { add_slide(content[i]); };

  // make first slide visible
  $(".slide:first").addClass('current');
}

$(function() {
  // keyboard scrolling
  $(window).keydown(function(e) {
    if(e.which == 39) { // right
      next_slide();

    } else if(e.which == 37) { // left
      prev_slide();

    }
  });

  // navigation button scrolling
  $("#navigation button.prev").click(function() { prev_slide() });
  $("#navigation button.next").click(function() { next_slide() });
});