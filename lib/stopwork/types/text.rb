require "kramdown"
require_relative "types"

module Stopwork
  module Types
    # Text slides
    # 
    # Slides consist of marked up text
    # Syntax is any valid markdown
    class Text < Slide
      # no match? method, always matches

      # populate div with marked down text
      def template
        '<div class="slide text">{{{body}}}</div>'
      end

      # slide content is passed through markdown
      def body
        Kramdown::Document.new(slide).to_html
      end
    end
  end
end