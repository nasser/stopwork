module Stopwork
  module Types
    # Video slide
    # 
    # Slides consist of a single embeded video. Currently YouTube and Vimeo only.
    # Syntax is any valid youtube or vimeo url
    class Video < Slide
      # match any video url
      def self.match? slide
        !! (slide =~ /\.(mp4|ogg|mov|webm)/i or slide =~/^data:video/i)
      end

      # populate the div with the appropriate video tag
      def template
        '<div class="slide video"><video preload=true src="{{url}}" controls></video></div>'
      end
      
      def url
        cached slide
      end
    end
  end
end