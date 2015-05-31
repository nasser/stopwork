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
      
      def cached url, key=nil
        key = url if key.nil?
        key_hash = Digest::SHA1.hexdigest key
        
        cached_finished = @slideshow.cache_folder_path + "/" + key_hash
        cached_incomplete = cached_finished + "-incomplete"
        
        if File.exists? cached_finished
          # file exits in cache, use it
          @slideshow.cache_folder_name + "/" + key_hash
          
        elsif File.exists? cached_incomplete
          # file is being downloaded, dont start new download, use url for now
          url
        else
          # file not in cache, not downloading, download it, use url for now
          fork do
            exec "echo \"#{key} -> #{key_hash}\";
                  curl -#L \"#{url}\" -o \"#{cached_incomplete}\";
                  mv \"#{cached_incomplete}\" \"#{cached_finished}\""
          end
          
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
require_relative "twitter"
require_relative "image"
require_relative "cloudapp"
require_relative "imgur"
require_relative "web"
require_relative "video"
require_relative "hostedvideo"

module Stopwork
  module Types
    self.match_order = [Imgur, CloudApp, Image, HostedVideo, Video, Twitter, Web, Text]

    def self.render slide, slideshow
      self.match_order.select { |f| f.match? slide }.first.new(slide, slideshow).render # TODO optimize
    end
  end
end