var Stopwork = {
  parse: function(source) {
    // return source.trim().replace(/\n\/\/.*\n/g, '').replace(/\n\s*/g, '\n').split("\n");
    return JSON.parse(source);
  },

  compile: function(slides) {
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
    if(this.current_slide_number() >= 0)
      window.location.hash = this.current_slide_number() + 1;
  },

  next_slide: function () {
    var current_slide = $(".slide.current");
    current_slide.removeClass("current");
    this.get_next_slide(current_slide).addClass("current");

    $("#navigation .current").html(this.current_slide_number() + 1);
    this.refresh_next_prev();
  },

  prev_slide: function () {
    var current_slide = $(".slide.current");
    current_slide.removeClass("current");
    this.get_prev_slide(current_slide).addClass("current");

    $("#navigation .current").html(this.current_slide_number() + 1);
    this.refresh_next_prev();
  },

  goto_slide: function(n) {
    var current_slide = $(".slide.current");
    current_slide.removeClass("current");
    $(".slide").eq(n).addClass("current");

    $("#navigation .current").html(this.current_slide_number() + 1);
    this.refresh_next_prev();
  },

  current_slide_number: function() {
    return $(".slide").index($(".slide.current"));
  },

  $container: null,

  present: function(content, container) {
    // content = content.trim();
    if(!container) container = "body";

    this.$container = $(container);

    this.$container.addClass('stopwork');
    this.$container.addClass('loading');

    // clear and append navigation elements
    this.$container.empty();
    this.$container.html('\
      <div id="near-navigation"> \
        <div id="navigation">\
          <button class="prev iconic iconic-arrow-left" />\
          <button class="next iconic iconic-arrow-right" />\
          <div class="current" />\
          <div class="total" />\
        </div>\
      </div>');

    // navigation button scrolling
    $("#navigation button.prev").click(function() { Stopwork.prev_slide() });
    $("#navigation button.next").click(function() { Stopwork.next_slide() });

    // keyboard input
    $(window).keyup(function(e) {
      $("#navigation").removeClass("hover");
    });

    // populate slides
    this.compile(content).forEach(function(slide) { $(container).append(slide) })
    $("#navigation .total").html($(".slide").size());
    this.goto_slide(window.location.hash.length > 0 ? parseInt(window.location.hash.substring(1)) - 1 : 0);

    $(window).keydown(function(e) {
      console.log(e.which)
      if(e.ctrlKey)
        $("#navigation").addClass("hover");

      if(e.which == 39) { // right
        if(!$("#editor").hasClass('down'))
          Stopwork.next_slide();

      } else if(e.which == 37) { // left
        if(!$("#editor").hasClass('down'))
          Stopwork.prev_slide();

      } else if(e.which == 27) { // esc
        if($("#editor").hasClass('down')) {
          Stopwork.replace_current_slide($("#editor textarea").val());
          $("#editor").removeClass('down');
        }

      }
    });
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
  if(slide.match(/\.(png|jpg|jpeg|gif)/i) || slide.match(/^data:image/i)) {
    var new_slide = $("<div class='slide'>");
    new_slide.addClass("image");
    if(!slide.match(/^(http:|https:|file:|data:image)/)) slide = "assets/" + slide;
    new_slide.css("background-image", "url(" + slide + ")");

    return new_slide;
  }

  return false;
})

window.onload = function() {
  $(".stopwork").removeClass('loading');
}
