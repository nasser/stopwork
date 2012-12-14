var Stopwork = {
  parse: function(source) {
    return source.trim().replace(/\n\/\/.*\n/g, '').replace(/\n\s*/g, '\n').split("\n");
  },

  compile: function(slide_text) {
    var slides = this.parse(slide_text);
    return slides.map(function(slide) {
      return Stopwork.filter(slide);
    });
  },

  filters: [],

  filter: function(slide) {
    for (var i = this.filters.length - 1; i >= 0; i--) {
      var filtered_slide = this.filters[i](slide);
      if(filtered_slide)
        return filtered_slide;
    };

    return slide;
  },

  get_next_slide: function (slide) {
    return slide.next(".slide").size() == 0 ? $(".slide:first") : slide.next(".slide");
  },

  get_prev_slide: function (slide) {
    return slide.prev(".slide").size() == 0 ? $(".slide:last") : slide.prev(".slide");
  },

  refresh_next_prev: function () {
    $(".slide").removeClass('next').removeClass('prev');
    this.get_next_slide($(".slide.current")).addClass('next');
    this.get_prev_slide($(".slide.current")).addClass('prev');
  },

  next_slide: function () {
    var current_slide = $(".slide.current");
    current_slide.removeClass("current");
    this.get_next_slide(current_slide).addClass("current");

    $("#navigation .current").html($(".slide").index($(".slide.current")) + 1);
    this.refresh_next_prev();
  },

  prev_slide: function () {
    var current_slide = $(".slide.current");
    current_slide.removeClass("current");
    this.get_prev_slide(current_slide).addClass("current");

    $("#navigation .current").html($(".slide").index($(".slide.current")) + 1);
    this.refresh_next_prev();
  },

  $container: null,

  present: function(content, container) {
    if(!container) container = "body";

    $container = $(container);

    $container.addClass('stopwork');
    $container.addClass('loading');

    // clear and append navigation elements
    $container.html('\
      <div id="near-navigation"> \
        <div id="navigation">\
          <button class="prev iconic iconic-arrow-left" />\
          <button class="next iconic iconic-arrow-right" />\
          <div class="current" />\
          <div class="total" />\
        </div>\
      </div>');

    // keyboard scrolling
    $(window).keydown(function(e) {
      if(e.which == 39) { // right
        Stopwork.next_slide();

      } else if(e.which == 37) { // left
        Stopwork.prev_slide();

      }
    });


    // navigation button scrolling
    $("#navigation button.prev").click(function() { Stopwork.prev_slide() });
    $("#navigation button.next").click(function() { Stopwork.next_slide() });

    // populate slides
    this.compile(content).forEach(function(slide) { $container.append(slide) })

    // make first slide visible
    $(".slide:first").addClass('current');
    // mark all other slides as next slides
    $(".current + .slide").addClass('next');
    $(".slide:last").addClass('prev');

    $("#navigation .total").html($(".slide").size());
    $("#navigation .current").html("1");
  }
}

/* text */
Stopwork.filters.push(function(slide) {
  var new_slide = $("<div class='slide'>");
  new_slide.addClass("text")
  new_slide.html(marked(slide));

  return new_slide;
})

/* web */
Stopwork.filters.push(function(slide) {
  if(match = slide.match(/^http/)) {
    var new_slide = $("<div class='slide'>");
    new_slide.addClass("web")
    var iframe = $("<iframe src='" + slide + "'>");
    new_slide.append(iframe);
    return new_slide;
  }

  return false;
})

/* videos */
Stopwork.filters.push(function(slide) {
  if(match = slide.match(/(youtube|vimeo).*?([\w\d]+)$/)) {
    var new_slide = $("<div class='slide'>");
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
    return new_slide;
  }

  return false;
})

/* images */
Stopwork.filters.push(function(slide) {
  if(match = slide.match(/\.(png|jpg|jpeg|gif)/i)) {
    var new_slide = $("<div class='slide'>");
    new_slide.addClass("image");
    if(!slide.match(/^http/)) slide = "assets/" + slide;
    new_slide.css("background-image", "url(" + slide + ")");

    return new_slide;
  }

  return false;
})

$(function() {
  Stopwork.present($(document).text())
})


window.onload = function() {
  $(".stopwork").removeClass('loading');
}
