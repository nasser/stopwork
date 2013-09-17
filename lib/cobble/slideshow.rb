require "mustache"
require_relative "cobble"

module Cobble
  # Template for whole slideshow
  class Slideshow < Mustache
    self.template_file = File.expand_path(File.dirname(__FILE__) + "/slideshow.mustache")

    attr_accessor :title

    def initialize source
      @title = "Cobble Slideshow"

      if source.respond_to? :read
        @title = File.basename(source, '.*').to_title + " - " + @title
        source = source.read
      end

      @slides = Compiler.compile source
    end

    def body
      @slides.map { |s| Cobble::Types.render(s) }.join "\n"
    end
  end
end