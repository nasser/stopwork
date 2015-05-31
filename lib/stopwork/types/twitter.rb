require "open-uri"
require "json"

module Stopwork
  module Types
    class Twitter < Slide
      def self.match? slide
        !! (slide =~ /twitter\.com/)
      end
      
      # populate div with marked down text
      def template
        '<div class="slide twitter">{{{body}}}</div>'
      end

      # slide content is passed through markdown
      def body
        data = JSON.parse(open("https://api.twitter.com/1/statuses/oembed.json?url=#{slide}").read)
        data["html"]
      end
    end
  end
end