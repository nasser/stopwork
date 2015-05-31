require "mustache"
require_relative "../Stopwork"

module Stopwork
  module Types
    class <<self
      attr_accessor :match_order
    end

    # Basic slide
    # 
    # Slides consist of unprocessed slide content. Normally not used except as
    # a basis for other slide types.
    class Slide < Mustache
      attr_reader :slide
      def initialize slide, slideshow
        @slide = slide
        @slideshow = slideshow
      end
      
      def cached url
        url_hash = Digest::SHA1.hexdigest url
        
        if File.exists? @slideshow.cache_folder_path + "/" + url_hash
          # file exits in cache, use it
          @slideshow.cache_folder_name + "/" + url_hash
        else
          # file not in cache, download it
          fork do
            exec "echo \"#{url} -> #{url_hash}\";
                  curl -#L #{url} -o #{@slideshow.cache_folder_path}/#{url_hash}-incomplete;
                  mv #{@slideshow.cache_folder_path}/#{url_hash}-incomplete #{@slideshow.cache_folder_path}/#{url_hash}"
          end
          
          # return url for now
          url
        end
      end

      def self.match? slide
        true
      end

      def template
        "<div class='slide'>{{slide}}</div>"
      end
    end
  end
end

require_relative "text"
require_relative "image"
require_relative "cloudapp"
require_relative "imgur"
require_relative "web"
require_relative "video"

module Stopwork
  module Types
    self.match_order = [Imgur, CloudApp, Image, Video, Web, Text]

    def self.render slide, slideshow
      self.match_order.select { |f| f.match? slide }.first.new(slide, slideshow).render # TODO optimize
    end
  end
end