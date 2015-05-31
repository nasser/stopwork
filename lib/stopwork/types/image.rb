require 'digest/sha1'

module Stopwork
  module Types
    # Image slides
    # 
    # Slides consist of a single image
    # Syntax is image filename
    class Image < Slide
      # match data:image or anything ending in an image filetype
      def self.match? slide
        !! (slide =~ /\.(png|jpg|jpeg|gif)/i or slide =~/^data:image/i)
      end

      # set slide's css background to image url, css will center/scale it
      def template
        '<div class="slide image" style="background-image:url({{url}});"></div>'
      end
      
      # url is adjusted to accomodate local images
      # TODO figure this out
      def url
        if slide =~ /^data:image/
          slide 
        else
          cached slide
        end
      end
    end
  end
end