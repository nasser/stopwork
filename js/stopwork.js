function get_next_slide (slide) {
  return slide.next(".slide").size() == 0 ? $(".slide:first") : slide.next(".slide");
}

function get_prev_slide (slide) {
  return slide.prev(".slide").size() == 0 ? $(".slide:last") : slide.prev(".slide");
}

function refresh_next_prev () {
  $(".slide").removeClass('next').removeClass('prev');
  get_next_slide($(".slide.current")).addClass('next');
  get_prev_slide($(".slide.current")).addClass('prev');
}

function next_slide () {
  var current_slide = $(".slide.current");
  current_slide.removeClass("current");
  get_next_slide(current_slide).addClass("current");

  $("#navigation .current").html($(".slide").index($(".slide.current")) + 1);
  refresh_next_prev();
}

function prev_slide () {
  var current_slide = $(".slide.current");
  current_slide.removeClass("current");
  get_prev_slide(current_slide).addClass("current");

  $("#navigation .current").html($(".slide").index($(".slide.current")) + 1);
  refresh_next_prev();
}

function add_slide (content, container) {
  var new_slide = $("<div class='slide'>");
  var match;

  /* image slide */
  if(match = content.match(/\.(png|jpg|jpeg|gif)/i)) {
    new_slide.addClass("image");
    if(!content.match(/^http/)) content = "assets/" + content;
    new_slide.css("background-image", "url(" + content + ")");
    $(container).append(new_slide);

  /* video slide */
  } else if(match = content.match(/(youtube|vimeo).*?([\w\d]+)$/)) {
    var host = match[1], id = match[2];

    new_slide.addClass("web");
    new_slide.addClass("video");

    var iframe;
    if(host == "youtube") {
      iframe = $("<iframe src='http://www.youtube-nocookie.com/embed/" + id + "?rel=0&showinfo=0&autohide=1&controls=0'>");

    } else if(host == "vimeo") {
      iframe = $("<iframe src='http://player.vimeo.com/video/" + id + "?badge=0&title=0&portrait=0&byline=0'>");

    }

    new_slide.append(iframe);
    $(container).append(new_slide);

  /* web slide */
  } else if(match = content.match(/^http/)) {
    new_slide.addClass("web")
    var iframe = $("<iframe src='" + content + "'>");
    new_slide.append(iframe);
    $(container).append(new_slide);

  /* text slide */
  } else {
    new_slide.addClass("text")
    new_slide.html(marked(content));
    $(container).append(new_slide);

    new_slide.css("margin-top", "-" + new_slide.height()/2 + "px");

  }

}

function present(content, container) {
  if(!container) container = "body";

  $(container).addClass('stopwork');
  $(container).addClass('loading');

  // append navigation elements
  $(container).html('\
    <div id="near-navigation"> \
      <div id="navigation">\
        <button class="prev iconic iconic-arrow-left" />\
        <button class="next iconic iconic-arrow-right" />\
        <div class="current" />\
        <div class="total" />\
      </div>\
    </div>');

  // populate slides
  for (var i = 0; i < content.length; i++) { add_slide(content[i], container); };

  // make first slide visible
  $(".slide:first").addClass('current');
  // mark all other slides as next slides
  $(".current + .slide").addClass('next');
  $(".slide:last").addClass('prev');

  $("#navigation .total").html(content.length);
  $("#navigation .current").html("1");
}

$(function() {
  // evaluate stopwork script into slideshow
  if($("script[type$='stopwork']").size() > 0) {
    present(eval( '[' + $("script[type$='stopwork']").text() + ']' ));
  }

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

window.onload = function() {
  $(".stopwork").removeClass('loading');
}
