require "mustache"
require_relative "stopwork"

module Stopwork
  # Template for whole slideshow
  class Slideshow < Mustache
    self.template_file = File.expand_path(File.dirname(__FILE__) + "/slideshow.mustache")

    attr_accessor :title, :source

    def initialize source
      @title = "Stopwork Slideshow"
      @source = source

      if source.respond_to? :read
        @title = File.basename(source, '.*').to_title + " - " + @title
        source = source.read
      end

      @slides = Compiler.compile source
    end

    def body
      @slides.map { |s| Stopwork::Types.render(s, self) }.join "\n"
    end
    
    def cache_folder_name
      ".stopwork"
    end
    
    def cache_folder_path
      cache_folder_path = File.expand_path(File.dirname(@source)) + "/.stopwork"
      Dir.mkdir(cache_folder_path) unless File.exists? cache_folder_path
      
      cache_folder_path
    end
    
    class Export < Slideshow
      def self.flatten template_file
        open(template_file).read.
        gsub(/<link rel="stylesheet" type="text\/css" href="([^"]+)">/) { |m|
          "<style type=\"text/css\">#{open(File.expand_path(File.dirname(__FILE__) + "/#{$1}")).read}</style>"
        }.gsub(/<script src="([^"]+)"><\/script>/) { |m|
          "<script type=\"text/javascript\">#{open(File.expand_path(File.dirname(__FILE__) + "/#{$1}")).read}</script>"
        }
      end
      
      self.template = flatten File.expand_path(File.dirname(__FILE__) + "/slideshow.mustache")
    end
  end
end