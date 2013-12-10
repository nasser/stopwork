module Stopwork
  module Types
    # Web slides
    # 
    # Slides consist of an embeded webpage
    # Syntax is any valid http address
    class Web < Slide
      # match anything starting with http
      def self.match? slide
        !! (slide =~ /^http/)
      end

      # populate div with an iframe
      def template
        '<div class="slide web"><iframe src="{{slide}}"></iframe></div>'
      end
    end
  end
end