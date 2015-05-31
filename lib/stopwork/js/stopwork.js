var Stopwork = {
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

  present: function(content, container) {
    // content = content.trim();
    if(!container) container = "body";

    $container = $(container);

    $container.addClass('stopwork');
    $container.addClass('loading');

    // clear and append navigation elements
    $container.append('\
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

$(function(){
  Stopwork.present()
})

window.onresize = function() {
  var img = new Image();
  var bodyStyle = window.getComputedStyle(document.body, null);

  Array.prototype.slice.call(document.querySelectorAll(".slide.image")).map(function(slide) {
    img.src = slide.style.backgroundImage.replace(/url\((['"])?(.*?)\1\)/gi, '$2') .split(',')[0];
    if(img.width > parseInt(bodyStyle.width) || img.height > parseInt(bodyStyle.height)) {
      slide.style.backgroundSize = "contain";
    } else {
      slide.style.backgroundSize = "";
    }
  });
}

window.onload = function() {
  $(".stopwork").removeClass('loading');
  window.onresize();
}