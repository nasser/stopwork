module Cobble
  module Types
    # Video slide
    # 
    # Slides consist of a single embeded video. Currently YouTube and Vimeo only.
    # Syntax is any valid youtube or vimeo url
    class Video < Slide
      # match any youtube or vimeo url
      def self.match? slide
        !! (slide =~ /(youtube|vimeo).*?([\w\d]+)$/)
      end

      # true if this is a youtube video
      def youtube?
        @host =~ /youtube/
      end

      # true if this is a vimeo
      def vimeo?
        @host =~ /vimeo/
      end

      # populate the div with the appropriate youtube/vimeo iframe
      def template
        <<-TEMPLATE
<div class="slide web video">
  {{#youtube?}}
    <iframe src='http://www.youtube-nocookie.com/embed/{{id}}?rel=0&showinfo=0&autohide=1&controls=0'></iframe>
  {{/youtube?}}
  {{#vimeo?}}
    <iframe src='http://player.vimeo.com/video/{{id}}?badge=0&title=0&portrait=0&byline=0'></iframe>
  {{/vimeo?}}
</div>
TEMPLATE
      end

      attr_reader :id
      def initialize slide
        super
        match = slide.match(/(youtube|vimeo).*?([\w\d]+)$/)
        @host = match[1]
        @id = match[2]
      end
    end
  end
end