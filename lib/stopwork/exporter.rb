require "rack"
require_relative "stopwork"

module Stopwork
  class Exporter
    def self.export file
      print "Exporting #{file} to #{file}.html..."
      File.open("#{file}.html", 'w') { |f| f.write Slideshow::Export.new(open(file)).render }
      puts "OK"
    end
  end
end