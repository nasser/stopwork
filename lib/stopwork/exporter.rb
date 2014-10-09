require "rack"
require_relative "stopwork"

module Stopwork
  class Exporter
    def self.export file, output
      print "Exporting #{file} to #{output}..."
      File.open(output, 'w') { |f| f.write Slideshow::Export.new(open(file)).render }
      puts "OK"
    end
  end
end