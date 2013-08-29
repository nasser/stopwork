require "rack"
require_relative "cobble"

module Cobble
  class Server < Rack::Directory
    def self.launch file, port=54021
      Rack::Handler::Thin.run new(file), :Port => port
    end

    def initialize file
      @file = file
      super File.dirname(file)
      puts ">> Cobble Slideshow 0.2b"
    end

    def call env
      if env['REQUEST_PATH'] == "/"
        [200, {'Content-Type' => 'text/html'}, Slideshow.new(@file).render]
      else
        super
      end
    end
  end
end