module Stopwork
  module Types
    # Image slides
    # 
    # Slides consist of a single image
    # Syntax is image filename
    class CloudApp < Image
      # match data:image or anything ending in an image filetype
      def self.match? slide
        !! (slide =~ /^http:\/\/cl.ly/)
      end

      # url is adjusted to accomodate local images
      # TODO figure this out
      def url
        cached "#{slide}/.png", slide
      end
    end
  end
end