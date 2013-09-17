require "rack"
require_relative "cobble"

module Cobble
  class Server
    def self.launch file, port=54021
      new(file).launch(port)
    end

    def launch port=54021
      puts ">> Cobble Serving on #{`ipconfig getifaddr en1`.strip}:#{port} (v0.2b codename DeKalb)"
      `open http://localhost:#{port}`
      Rack::Handler::Thin.run self, :Port => port
    end

    def initialize file
      @file = file
      super File.dirname(__FILE__)
    end

    def call env
      # root serves slideshow markup
      if env['REQUEST_PATH'] == "/"
        [200, {'Content-Type' => 'text/html'}, Slideshow.new(open(@file)).render]

      # check local to slideshow file first for assets
      elsif File.exists? File.expand_path(File.dirname(@file) + env['REQUEST_PATH'])
        [200, {'Content-Type' => 'text/html'}, open(File.expand_path(File.dirname(@file) + env['REQUEST_PATH'])).read]

      # check local to library second for assets
      elsif File.exists? File.expand_path(File.dirname(__FILE__) + env['REQUEST_PATH'])
        [200, {'Content-Type' => 'text/html'}, open(File.expand_path(File.dirname(__FILE__) + env['REQUEST_PATH'])).read]

      # else not found
      else
        [404, {'Content-Type' => 'text/html'}, "<h1>NOT FOUND</h1>"]

      end
    end
  end
end