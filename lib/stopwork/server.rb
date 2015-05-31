require "rack"
require_relative "stopwork"

module Stopwork
  class Server
    def self.launch file, port=54021
      new(file).launch(port)
    end

    def launch port=54021
      puts ">> Stopwork Serving on #{`ipconfig getifaddr en1`.strip}:#{port} (v0.2b codename DeKalb)"
      `open http://localhost:#{port}`
      Rack::Handler::Thin.run self, :Port => port
    end

    def initialize file
      @file = file
      # super File.dirname(__FILE__)
    end
    
    def mime_type file
      if file =~ /\.css$/
        "text/css"
      else
        `file -Ib #{file}`.gsub(/\n/,"")
      end
    end

    def call env
      slideshow_relative = File.expand_path(File.dirname(@file) + env['REQUEST_PATH'])
      stopwork_relative = File.expand_path(File.dirname(__FILE__) + env['REQUEST_PATH'])
      
      # root serves slideshow markup
      if env['REQUEST_PATH'] == "/"
        [200, {'Content-Type' => 'text/html'}, Slideshow.new(open(@file)).render]

      # check local to slideshow file first for assets
      elsif File.exists? slideshow_relative
        [200, {'Content-Type' => mime_type(slideshow_relative) }, open(slideshow_relative).read]

      # check local to library second for assets
      elsif File.exists? stopwork_relative
        [200, {'Content-Type' => mime_type(stopwork_relative)}, open(stopwork_relative).read]

      # else not found
      else
        [404, {'Content-Type' => 'text/html'}, "<h1>NOT FOUND</h1>"]

      end
    end
  end
end